import { useProjectStore } from "@/store/useProjectStore"

export default function ProjectDetails() {
    const { selectedProject } = useProjectStore()
    return (
        <pre>
            {selectedProject ? JSON.stringify(selectedProject, null, 2) : "No project selected"}
        </pre> 
    )
}