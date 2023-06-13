export type WorkbookDataType = {
    question_id: number,
    question_type: string,
    question_name: string,
    question_contents: string[],
    question_description: string,
    question_correct: number,
    question_reference: { title: string; author: string; link: string; }[],
    question_view: number,
    question_create: string,
    question_edited?: string,
    question_tag: string[] | null,
}
