import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageShell from "../Components/PageShell";
import { useEmpresaOptional } from "../contexts/EmpresaContext";
import BlocoServico from "../Components/Servicos/BlocoServico";
import DronePuverizando from "../assets/imgServicos/DronePuverizando.png";
import DroneDispensadorSolidos from "../assets/imgServicos/DroneDispensadorSolidos.png";
import DroneFertilizante from "../assets/imgServicos/DroneFertilizante.png";
import DroneMapeamento from "../assets/imgServicos/DroneMapeamento.png";

const servicosData = [
  {
    titulo: "Pulverização de Defensivos",
    imagem: DronePuverizando,
    introducao:
      "Nossa principal especialidade é a aplicação precisa de defensivos agrícolas utilizando drones de última geração. Este método oferece inúmeras vantagens em relação aos métodos tradicionais:",
    itens: [
      "Maior precisão na aplicação, reduzindo o desperdício de produtos",
      "Menor compactação do solo, pois não há tráfego de máquinas pesadas",
      "Aplicação em áreas de difícil acesso ou terrenos acidentados",
      "Redução no uso de água, tornando o processo mais sustentável",
      "Menor exposição dos trabalhadores aos produtos químicos",
      "Rapidez na aplicação, permitindo intervenções em momentos críticos",
    ],
    fechamento:
      "Atendemos lavouras de banana, milho, soja e café com equipamentos calibrados especificamente para cada cultura e tipo de aplicação.",
  },
  {
    titulo: "Dispersão de Sementes",
    imagem: DroneDispensadorSolidos,
    introducao:
      "Oferecemos serviços especializados de semeadura aérea com drones, ideal para diversas situações:",
    itens: [
      "Plantio de adubos verdes e culturas de cobertura",
      "Semeadura em áreas de difícil acesso",
      "Recuperação de áreas degradadas",
      "Plantio direto em sistemas integrados",
      "Dispersão de sementes de pastagem",
    ],
    fechamento:
      "Nossos equipamentos são adaptados para diferentes tipos e tamanhos de sementes, garantindo distribuição uniforme e taxa de germinação ideal.",
  },
  {
    titulo: "Aplicação de Fertilizantes",
    imagem: DroneFertilizante,
    introducao:
      "A aplicação de fertilizantes com drones representa uma evolução significativa na nutrição de plantas:",
    itens: [
      "Distribuição homogênea de fertilizantes sólidos e líquidos",
      "Aplicação localizada, seguindo mapas de fertilidade",
      "Possibilidade de aplicação foliar com alta eficiência",
      "Redução de perdas por lixiviação ou volatilização",
      "Aplicação em momentos críticos do desenvolvimento das plantas",
    ],
    fechamento:
      "Trabalhamos com diversos tipos de fertilizantes e bioestimulantes, adaptando a aplicação às necessidades específicas de cada cultura.",
  },
  {
    titulo: "Mapeamento de Áreas",
    imagem: DroneMapeamento,
    introducao:
      "Utilizamos drones equipados com câmeras multiespectrais para realizar mapeamentos detalhados das propriedades:",
    itens: [
      "Identificação de áreas com deficiências nutricionais",
      "Detecção precoce de pragas e doenças",
      "Avaliação do estande de plantas",
      "Mapeamento de falhas de plantio",
      "Estimativa de produtividade",
      "Geração de mapas para agricultura de precisão",
    ],
    fechamento:
      "Os dados coletados são processados e entregues em formatos de fácil interpretação, auxiliando na tomada de decisões para manejo da lavoura.",
    rota: "/contratar",
  },
];

export default function Servicos() {
  const navigate = useNavigate();
  const empresa = useEmpresaOptional();
  const contratarPath = empresa?.path ? empresa.path("contratar") : "/contratar";

  return (
    <PageShell
      title="Serviços"
      subtitle="Pulverização, dispersão de sementes, aplicação de fertilizantes e mapeamento com drones."
       actions={
      
          <Button
            type="primary"
            onClick={() => navigate(contratarPath)}
            style={{
              borderRadius: 999,
              background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              border: "none",
              fontWeight: 600,
              paddingInline: 18,
            }}
           
          >
            Solicitar Orçamento
          </Button>
       }
    >
      {/* Serviços detalhados */}
      <div style={{ maxWidth: "100%" }}>
        {servicosData.map((servico) => (
          <BlocoServico key={servico.titulo} {...servico} />
        ))}
      </div>
    </PageShell>
  );
}
