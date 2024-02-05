import { toast } from './state'

export const ButtonToaster = () => {
    
    return (
        <button
            onClick={() => toast("This is a test toast!")}
        > clik me</button>
    )
}
