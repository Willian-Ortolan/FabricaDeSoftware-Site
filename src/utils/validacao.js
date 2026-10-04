import dayjs from "dayjs";

export const LIMITES = {
  NOME: 200,
  FAZENDA: 200,
  CIDADE: 100,
  CNPJ: 14,
  CNPJ_MASCARA: 18,
  TELEFONE: 50,
  OBSERVACAO: 500,
  FORMA_PAGAMENTO_OUTRO: 100,
  AREA_MAX: 999999.99,
  MOEDA_MAX: 99999999.99,
  SENHA_MIN: 6,
  IMAGEM_MAX_MB: 5,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function formatarTelefone(valor = "") {
  const digits = String(valor).replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Exibição em grids e tabelas */
export function exibirTelefone(valor) {
  if (!valor) return "—";
  return formatarTelefone(valor);
}

export function normalizarTelefone(valor = "") {
  return String(valor).replace(/\D/g, "").slice(0, 11);
}

export function telefoneValido(valor) {
  if (!valor) return true;
  const digits = String(valor).replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

export function normalizarCnpj(valor = "") {
  return String(valor)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, LIMITES.CNPJ);
}

export function formatarCnpj(valor = "") {
  const raw = normalizarCnpj(valor);
  if (!raw) return "";

  if (raw.length <= 2) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 2)}.${raw.slice(2)}`;
  if (raw.length <= 8) {
    return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5)}`;
  }
  if (raw.length <= 12) {
    return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8)}`;
  }

  const base = raw.slice(0, LIMITES.CNPJ);
  return `${base.slice(0, 2)}.${base.slice(2, 5)}.${base.slice(5, 8)}/${base.slice(8, 12)}-${base.slice(12, 14)}`;
}

/** Exibição em grids e tabelas */
export function exibirCnpj(valor) {
  if (!valor) return "—";
  return formatarCnpj(valor);
}

export function bloquearEntradaAposCnpjCompleto(event) {
  const permitidas = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];
  if (permitidas.includes(event.key)) return;
  if (event.ctrlKey || event.metaKey) return;

  const el = event.currentTarget;
  const raw = normalizarCnpj(el?.value ?? "");
  if (raw.length < LIMITES.CNPJ) return;
  if (el && el.selectionStart !== el.selectionEnd) return;
  if (/^[a-zA-Z0-9]$/.test(event.key)) event.preventDefault();
}

export function cnpjValido(valor) {
  if (!valor) return false;
  return normalizarCnpj(valor).length === LIMITES.CNPJ;
}

export function formatarMoedaInput(value) {
  if (value == null || value === "") return "";
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseMoedaInput(value) {
  if (value == null || value === "") return null;
  const cleaned = String(value)
    .replace(/[^\d,.]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const num = parseFloat(cleaned);
  if (Number.isNaN(num) || num < 0) return null;
  return num;
}

export function formatarAreaInput(value) {
  if (value == null || value === "") return "";
  const num = Number(value);
  if (Number.isNaN(num) || num < 0) return "";
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function parseAreaInput(value) {
  if (value == null || value === "") return null;
  const cleaned = String(value)
    .replace(/[^\d,.]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const num = parseFloat(cleaned);
  if (Number.isNaN(num) || num <= 0) return null;
  return Math.min(num, LIMITES.AREA_MAX);
}

/** Bloqueia letras, sinal negativo e caracteres especiais em campos numéricos. */
export function bloquearTeclasInvalidasNumero(event) {
  if (["-", "+", "e", "E"].includes(event.key)) {
    event.preventDefault();
    return;
  }

  const permitidas = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];
  if (permitidas.includes(event.key)) return;
  if (event.ctrlKey || event.metaKey) return;
  if (/^[0-9]$/.test(event.key)) return;
  if (event.key === "," || event.key === ".") {
    const valor = event.currentTarget?.value ?? "";
    if (!valor.includes(",") && !valor.includes(".")) return;
  }
  event.preventDefault();
}

export const propsInputMoeda = {
  min: 0.01,
  max: LIMITES.MOEDA_MAX,
  step: 0.01,
  precision: 2,
  controls: true,
  inputMode: "decimal",
  formatter: formatarMoedaInput,
  parser: parseMoedaInput,
  onKeyDown: bloquearTeclasInvalidasNumero,
};

export const propsInputArea = {
  min: 0.01,
  max: LIMITES.AREA_MAX,
  step: 0.01,
  precision: 2,
  controls: true,
  inputMode: "decimal",
  formatter: formatarAreaInput,
  parser: parseAreaInput,
  onKeyDown: bloquearTeclasInvalidasNumero,
};

/** Máscara visual: (00) 00000-0000. Persistir com normalizarTelefone(). */
export const propsInputTelefone = {
  placeholder: "(00) 00000-0000",
  maxLength: 15,
  inputMode: "tel",
  autoComplete: "tel",
};

/** Máscara visual: 00.000.000/0000-00 (14 alfanuméricos). Persistir com normalizarCnpj(). */
export const propsInputCnpj = {
  maxLength: LIMITES.CNPJ_MASCARA,
  placeholder: "00.000.000/0000-00",
  style: { textTransform: "uppercase" },
  inputMode: "text",
  autoComplete: "off",
  onKeyDown: bloquearEntradaAposCnpjCompleto,
};

export function desabilitarDatasPassadas(current) {
  return current && current < dayjs().startOf("day");
}

export function regrasObrigatorio(mensagem) {
  return [{ required: true, message: mensagem, whitespace: true }];
}

export function regrasTexto(label, max = LIMITES.NOME) {
  return [
    { required: true, message: `Informe ${label.toLowerCase()}`, whitespace: true },
    { max, message: `${label} deve ter no máximo ${max} caracteres` },
  ];
}

export function regrasTextoOpcional(max = LIMITES.OBSERVACAO) {
  return [{ max, message: `Máximo de ${max} caracteres` }];
}

export function regrasEmail() {
  return [
    { required: true, message: "Informe o e-mail", whitespace: true },
    {
      validator: (_, value) => {
        if (!value || EMAIL_REGEX.test(String(value).trim())) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("E-mail inválido"));
      },
    },
  ];
}

export function regrasCnpj() {
  return [
    { required: true, message: "Informe o CNPJ", whitespace: true },
    {
      validator: (_, value) => {
        if (!value || cnpjValido(value)) return Promise.resolve();
        return Promise.reject(
          new Error(`CNPJ deve ter ${LIMITES.CNPJ} caracteres alfanuméricos`),
        );
      },
    },
  ];
}

export function regrasSenha() {
  return [
    { required: true, message: "Informe a senha" },
    {
      min: LIMITES.SENHA_MIN,
      message: `Mínimo de ${LIMITES.SENHA_MIN} caracteres`,
    },
  ];
}

export function regrasTelefone(opcional = true) {
  if (opcional) {
    return [
      {
        validator: (_, value) => {
          if (!value || telefoneValido(value)) return Promise.resolve();
          return Promise.reject(new Error("Telefone inválido. Use (00) 00000-0000"));
        },
      },
    ];
  }
  return [
    { required: true, message: "Informe o telefone" },
    {
      validator: (_, value) => {
        if (telefoneValido(value)) return Promise.resolve();
        return Promise.reject(new Error("Telefone inválido. Use (00) 00000-0000"));
      },
    },
  ];
}

export function regraMoedaPositiva(label = "Valor") {
  return {
    validator: (_, value) => {
      if (value == null || value === "") {
        return Promise.reject(new Error(`Informe ${label.toLowerCase()}`));
      }
      if (Number(value) <= 0) {
        return Promise.reject(new Error(`${label} deve ser maior que zero`));
      }
      if (Number(value) > LIMITES.MOEDA_MAX) {
        return Promise.reject(new Error(`${label} excede o limite permitido`));
      }
      return Promise.resolve();
    },
  };
}

export function regraAreaPositiva(label = "Área") {
  return {
    validator: (_, value) => {
      if (value == null || value === "") {
        return Promise.reject(new Error(`Informe ${label.toLowerCase()}`));
      }
      if (Number(value) <= 0) {
        return Promise.reject(new Error(`${label} deve ser maior que zero`));
      }
      if (Number(value) > LIMITES.AREA_MAX) {
        return Promise.reject(new Error(`${label} excede o limite permitido`));
      }
      return Promise.resolve();
    },
  };
}

export function regrasDataExecucao() {
  return [
    { required: true, message: "Informe a data" },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve();
        if (value.startOf("day").isBefore(dayjs().startOf("day"))) {
          return Promise.reject(new Error("A data não pode ser no passado"));
        }
        return Promise.resolve();
      },
    },
  ];
}

export function regrasDataOperacao() {
  return [
    { required: true, message: "Informe a data" },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve();
        if (value.startOf("day").isBefore(dayjs().startOf("day"))) {
          return Promise.reject(new Error("A data não pode ser no passado"));
        }
        return Promise.resolve();
      },
    },
  ];
}

export function validarMoedaManual(valor, label = "Valor") {
  if (valor == null || valor === "") {
    throw new Error(`Informe ${label.toLowerCase()}`);
  }
  if (Number(valor) <= 0) {
    throw new Error(`${label} deve ser maior que zero`);
  }
  if (Number(valor) > LIMITES.MOEDA_MAX) {
    throw new Error(`${label} excede o limite permitido`);
  }
}

export function validarDataManual(data, label = "Data") {
  if (!data) {
    throw new Error(`Informe ${label.toLowerCase()}`);
  }
  if (dayjs(data).startOf("day").isBefore(dayjs().startOf("day"))) {
    throw new Error(`${label} não pode ser no passado`);
  }
}

export function validarImagem(file) {
  const tipos = ["image/jpeg", "image/png", "image/webp"];
  if (!tipos.includes(file.type)) {
    throw new Error("Formato inválido. Use JPG, PNG ou WEBP.");
  }
  if (file.size > LIMITES.IMAGEM_MAX_MB * 1024 * 1024) {
    throw new Error(`A imagem deve ter no máximo ${LIMITES.IMAGEM_MAX_MB} MB.`);
  }
}
