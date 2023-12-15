import * as S from "./general.styles"


type TitleProp = {
    label: string
}

export const Title = (props: TitleProp) => {

    return <title>{props.label}</title>
}



export const Page404 = () => {
    return (
        <div>
            Page not Found
        </div>
    )
}