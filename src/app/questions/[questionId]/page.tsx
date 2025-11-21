import IntoQuestion from "@/app/_answers/IntoQuestion";

export default async function ViewQuestionDetails({ params }: { params: Promise<{ questionId: string }> }) {
  const { questionId } = await params;

  return (
    <div className="pt-5 md:pt-10 pb-16 flex flex-col items-center px-4 sm:px-0 max-w-5xl mx-auto">
      <IntoQuestion questionId={questionId} />
    </div>

  );
}
