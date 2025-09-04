import {compose} from '../../../utils'
import {withWrapper} from '../../hocs'

export function composeProviders(...providers: React.FC[]) {
    return compose(...(providers.map(provider => withWrapper(provider))))
}
