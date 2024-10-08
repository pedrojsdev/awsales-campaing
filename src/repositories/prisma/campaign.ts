import { Campaign } from "@prisma/client";
import prisma from "../../../prisma/client";
import { CreateCampaignDTO } from "../../dtos/createCampaign";
import { CampaignRepository } from "../campaignRepository";

export class PrismaCampaignRepository implements CampaignRepository{
    async create(data: CreateCampaignDTO): Promise<Campaign> {
        return await prisma.campaign.create({
            data: {
                nome: data.nome,
                categoria: data.categoria,
                dataFim: new Date(data.dataFim),
                dataInicio: new Date(data.dataInicio),
                status: data.dataFim < new Date() ? 'expirada' : 'ativa',
            }
        })
    }

    async findAll(): Promise<Campaign[]> {
        return await prisma.campaign.findMany()
    }

    async findById(id: number): Promise<Campaign | null> {
        return await prisma.campaign.findUnique({where: {id}})
    }

    async update(id: number, data: Partial<CreateCampaignDTO>): Promise<Campaign> {
       return await prisma.campaign.update({
            where: {id},
            data
        })
    }
}