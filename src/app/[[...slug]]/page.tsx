import { ReactElement } from 'react'

import 'swagger-ui-react/swagger-ui.css'
import { SwaggerUI } from '@/components/clientSwaggerUi'
import { testdata } from '@/testdata/testdata'
import { OpenAPI3 } from '@/types'
import { isLocalOrDemo } from '@/utils/env'

export default async function ApiDocs(): Promise<ReactElement> {
    const spec: OpenAPI3 = {
        openapi: '3.0.1',
        info: {
            title: 'Flex APIer',
            version: '1',
        },
        servers: [
            {
                url: 'https://www.ekstern.dev.nav.no',
                description: 'dev-gcp',
            },
        ],
        paths: {},
        components: {
            schemas: {},
        },
    }

    const backendSpecs = openApiSpecs()
    for (const k in backendSpecs.sykepengesoknadFrontend.paths) {
        spec.paths!['/syk/sykepengesoknad/api/sykepengesoknad-backend' + k] =
            backendSpecs.sykepengesoknadFrontend.paths[k]
    }
    for (const k in backendSpecs.sykepengesoknadFrontend.components?.schemas) {
        spec.components!.schemas![k] = backendSpecs.sykepengesoknadFrontend.components.schemas[k]
    }

    return <SwaggerUI spec={spec} />
}

function openApiSpecs(): Specs {
    if (isLocalOrDemo) {
        return {
            sykepengesoknadFrontend: testdata,
        }
    }
    return {
        sykepengesoknadFrontend: testdata,
    }
}

interface Specs {
    sykepengesoknadFrontend: OpenAPI3
}
