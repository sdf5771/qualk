export type WorkbookDataType = {
    contentId: number,
    title: string,
    type: string,
    lang?: string,

    isTrance?: boolean,
    contents?: string[],
    correct?: number,
    description?: string,
    reference?: string | null,

    view?: number,
    create?: string,
    tag?: string[] | [],
}