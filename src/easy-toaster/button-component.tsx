import { toast } from './observer'

export const ButtonComponent = () => {
    return (
        <button
            onClick={() => toast.notify("This is a test toast!")}
        > clik me</button>
    )
}
