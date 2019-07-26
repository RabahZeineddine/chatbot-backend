/* eslint-disable */
export const NODE_ENV = process.env.NODE_ENV || 'development'
import development from './development'
import quality_assurance from './quality_assurance'
import production from './production'

const configurations = {
    development: {
        PORT: 4000,
        NODE_ENV,
        ...development
    },
    quality_assurance: {
        PORT: 4000,
        NODE_ENV,
        ...quality_assurance
    },
    production: {
        PORT: process.env.PORT || 80,
        NODE_ENV,
        ...production
    }
}

export default configurations[NODE_ENV]