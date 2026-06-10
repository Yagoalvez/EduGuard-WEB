import MedicacaoRepository from "../repositories/MedicacaoRepository"

class MedicacaoService {
  async getMedicacoesByResponsavel(idResponsavel: number) {
    const medicacoes = await MedicacaoRepository.findByResponsavel(idResponsavel)
    return medicacoes
  }
}

export default new MedicacaoService()
