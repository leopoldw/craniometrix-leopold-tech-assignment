import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
    <div className={'m-[20px]'}>
        <div className={'w-[1000px] my-0 mx-auto'}>{children}</div>
    </div>
)

export default Layout