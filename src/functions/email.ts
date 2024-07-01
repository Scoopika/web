"use server";

interface Props {
  to: string;
  text: string;
}

export default async function sendEmail({ to, text }: Props) {}
