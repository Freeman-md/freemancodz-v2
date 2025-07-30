"use server"

export const createProject = async (prevState: unknown, formData: FormData) => {
    console.log(prevState, formData)
}

export const updateProject = async (prevState: unknown, formData: FormData) => {
    console.log(prevState, formData)
}

export const deleteProject = async (id: string) => {
    console.log(id)
}