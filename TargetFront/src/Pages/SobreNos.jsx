import PageShell from "../Components/PageShell";
import BlocoServico from "../Components/Servicos/BlocoServico";

const servicosData = [
  {
    titulo: "Tecnologia que voa, resultados que ficam.",
    //imagem: DronePuverizando,
    introducao: `Na Target Pulverização, unimos a tradição do campo com a vanguarda da tecnologia aérea. Localizada em Delfinópolis - MG, nossa empresa nasceu com o propósito de transformar o manejo agrícola através do uso de drones de última geração.
       Entendemos que a eficiência no campo não permite desperdícios. Por isso, oferecemos soluções de pulverização, dispersão e mapeamento que garantem aplicação precisa, redução de custos com insumos e zero compactação do solo. Nosso compromisso é com a produtividade do agricultor e a sustentabilidade do agronegócio mineiro, entregando dados reais e operações de alta performance em cada voo.`,
    itens: [
      " ",
      //   "Maior precisão na aplicação, reduzindo o desperdício de produtos",
      //   "Menor compactação do solo, pois não há tráfego de máquinas pesadas",
      //   "Aplicação em áreas de difícil acesso ou terrenos acidentados",
      //   "Redução no uso de água, tornando o processo mais sustentável",
      //   "Menor exposição dos trabalhadores aos produtos químicos",
      //   "Rapidez na aplicação, permitindo intervenções em momentos críticos",
    ],
    fechamento:
      "Atendemos lavouras de banana, milho, soja e café com equipamentos calibrados especificamente para cada cultura e tipo de aplicação.",
  },
];

export default function SobreNos() {
  return (
    <PageShell
      title="Target - Quem somos."
      subtitle="Equipamentos e processos para entregar precisão, segurança e resultados."
    >
      <div style={{ maxWidth: "100%" }}>
        {servicosData.map((servico) => (
          <BlocoServico key={servico.titulo} {...servico} />
        ))}
      </div>
    </PageShell>
  );
}