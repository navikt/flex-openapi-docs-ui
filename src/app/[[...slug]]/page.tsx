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

    const backendSpecs = await openApiSpecs()

    function parseSpecs(specs: OpenAPI3, prefix: string): void {
        for (const k in specs.paths) {
            spec.paths![prefix + k] = specs.paths[k]
        }
        for (const k in specs.components?.schemas) {
            spec.components!.schemas![k] = specs.components.schemas[k]
        }
    }
    parseSpecs(backendSpecs.spinnsynBackend, '/syk/sykepenger/api/spinnsyn-backend')
    parseSpecs(backendSpecs.dittSykefravaerBackend, '/syk/sykefravaer/api/ditt-sykefravaer-backend')
    parseSpecs(backendSpecs.sykepengesoknadBackend, '/syk/sykepengesoknad/api/sykepengesoknad-backend')

    return <SwaggerUI spec={spec} />
}

async function openApiSpecs(): Promise<Specs> {
    if (isLocalOrDemo) {
        return {
            sykepengesoknadBackend: testdata,
            spinnsynBackend: testdata,
            dittSykefravaerBackend: testdata,
        }
    }

    async function fetchApiDocs(app: string): Promise<OpenAPI3> {
        return await (
            await fetch(`http://${app}/v3/api-docs`, {
                next: { revalidate: 3600 },
            })
        ).json()
    }

    return {
        sykepengesoknadBackend: await fetchApiDocs('sykepengesoknad-backend'),
        spinnsynBackend: await fetchApiDocs('spinnsyn-backend'),
        dittSykefravaerBackend: await fetchApiDocs('ditt-sykefravaer-backend'),
    }
}

interface Specs {
    sykepengesoknadBackend: OpenAPI3
    spinnsynBackend: OpenAPI3
    dittSykefravaerBackend: OpenAPI3
}
