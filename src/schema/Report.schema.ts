import { z, number, string } from "zod";

export const getReportSchema = z.object
(
	{
		body:z.object
		(
			{
				ref_report: string().nonempty(), 
				ref_pessoa: number().optional().nullable(),
				ref_peca: number().optional().nullable(),
				
				
			}
		)
	}
);

export type getReportSchema = z.infer<typeof getReportSchema>;