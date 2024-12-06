"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Steps from "@/components/shared/Steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMark from "@/data/hooks/use-mark";

// Validação com Zod
const markSchema = z.object({
  description: z
    .string()
    .nonempty("Descrição é obrigatória")
    .min(3, "Descrição deve ter pelo menos 3 caracteres"),
});

// Tipos gerados pelo Zod
type MarkFormValues = z.infer<typeof markSchema>;

export default function MarkForm() {
  // Configuração do React Hook Form
  const form = useForm<MarkFormValues>({
    resolver: zodResolver(markSchema),
    defaultValues: {
      description: "",
    },
  });

  const { mark, saveMark, updateMark, descriptionInUse } = useMark();

  const labels = ["Descrição"];
  const authNextStep = [true];

  const onSubmit = (data: MarkFormValues) => {
    updateMark({ ...mark, description: data.description });
  };

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        actionExec={saveMark}
        authNextStep={authNextStep}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo: Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a descrição" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira a descrição da marca.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Botão de Enviar */}
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
        <div></div>
      </Steps>
    </div>
  );
}
