import { useEffect } from "react";

interface CreateImageProps {
    activeIcon: string
    setActiveIcon: React.Dispatch<React.SetStateAction<string>>
}
export function CreateImage({ activeIcon, setActiveIcon }: CreateImageProps) {

    useEffect(() => {
        return () => {
            console.log('Component will unmount')
            setActiveIcon('Home')
        }
    }, [])


    return (
        <section className="create-image-modal">
            heyyy
        </section>
    )
}
