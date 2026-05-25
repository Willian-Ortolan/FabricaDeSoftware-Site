import axios from "axios";

const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});

const forecastApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

const CIDADE_PADRAO = "Delfinópolis";

const cacheCoordenadas = new Map();
const cachePrevisao = new Map();

const DESCRICAO_CLIMA = {
  0: "Céu limpo",
  1: "Quase limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina gelada",
  51: "Garoa leve",
  53: "Garoa",
  55: "Garoa forte",
  61: "Chuva leve",
  63: "Chuva",
  65: "Chuva forte",
  71: "Neve leve",
  73: "Neve",
  80: "Pancadas leves",
  81: "Pancadas",
  82: "Pancadas fortes",
  95: "Tempestade",
};

function normalizarCidade(cidade) {
  const valor = (cidade || "").trim();
  return valor.length > 0 ? valor : CIDADE_PADRAO;
}

async function buscarCoordenadas(cidade) {
  const nome = normalizarCidade(cidade);

  if (cacheCoordenadas.has(nome)) {
    return cacheCoordenadas.get(nome);
  }

  const { data } = await geocodingApi.get("/search", {
    params: {
      name: nome,
      count: 1,
      language: "pt",
      country_code: "BR",
      format: "json",
    },
  });

  const local = data?.results?.[0];
  if (!local) {
    throw new Error(`Cidade não encontrada: ${nome}`);
  }

  const coords = {
    latitude: local.latitude,
    longitude: local.longitude,
    nome: local.name,
    uf: local.admin1,
  };

  cacheCoordenadas.set(nome, coords);
  return coords;
}

/**
 * Previsão diária para uma data (yyyy-MM-dd).
 */
export async function getPrevisaoDia(cidade, dataIso) {
  const chave = `${normalizarCidade(cidade)}|${dataIso}`;
  if (cachePrevisao.has(chave)) {
    const cached = cachePrevisao.get(chave);
    if (!cached.alertas) {
      cached.alertas = avaliarAlertasVoo(cached);
    }
    return cached;
  }

  const coords = await buscarCoordenadas(cidade);

  const { data } = await forecastApi.get("/forecast", {
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max",
      timezone: "America/Sao_Paulo",
      start_date: dataIso,
      end_date: dataIso,
    },
  });

  const i = 0;
  const code = data.daily?.weather_code?.[i] ?? 0;

  const previsao = {
    cidade: coords.nome,
    uf: coords.uf,
    data: dataIso,
    descricao: DESCRICAO_CLIMA[code] || "Condição variável",
    tempMax: data.daily?.temperature_2m_max?.[i],
    tempMin: data.daily?.temperature_2m_min?.[i],
    chuvaPct: data.daily?.precipitation_probability_max?.[i],
    ventoKmh: data.daily?.windspeed_10m_max?.[i],
    code,
  };

  const previsaoComAlerta = {
    ...previsao,
    alertas: avaliarAlertasVoo(previsao),
  };

  cachePrevisao.set(chave, previsaoComAlerta);
  return previsaoComAlerta;
}

export const LIMITES_VOO = {
  ventoKmh: 20,
  chuvaPct: 60,
};

/**
 * Níveis: ok (verde) | atencao (laranja, só vento OU só chuva) | critico (vermelho, vento E chuva ou tempestade)
 */
export function avaliarAlertasVoo(previsao) {
  const vento = previsao?.ventoKmh ?? 0;
  const chuva = previsao?.chuvaPct ?? 0;
  const code = previsao?.code ?? 0;

  const ventoAlto = vento > LIMITES_VOO.ventoKmh;
  const chuvaAlta = chuva > LIMITES_VOO.chuvaPct;
  const tempestade = code >= 95;

  const mensagens = [];
  if (ventoAlto) {
    mensagens.push(`Vento acima de ${LIMITES_VOO.ventoKmh} km/h (${Math.round(vento)} km/h)`);
  }
  if (chuvaAlta) {
    mensagens.push(`Chance de chuva acima de ${LIMITES_VOO.chuvaPct}% (${chuva}%)`);
  }
  if (tempestade) {
    mensagens.push("Previsão de tempestade");
  }

  const critico = tempestade || (ventoAlto && chuvaAlta);
  const atencao = !critico && (ventoAlto || chuvaAlta);

  let nivel = "ok";
  if (critico) nivel = "critico";
  else if (atencao) nivel = "atencao";

  const rotulo =
    nivel === "critico"
      ? "Não recomendado voar"
      : nivel === "atencao"
        ? "Atenção ao voar"
        : "Condições favoráveis";

  return { nivel, rotulo, mensagens, ventoAlto, chuvaAlta, tempestade };
}
