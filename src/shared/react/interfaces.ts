import React, {PropsWithChildren} from 'react'

export type ReactHOC<WrapperProps extends PropsWithChildren<{}> = PropsWithChildren<{}>> = <ComponentProps>(
    Component: React.FC<PropsWithChildren<ComponentProps>>,
) => React.FC<ComponentProps & WrapperProps>
