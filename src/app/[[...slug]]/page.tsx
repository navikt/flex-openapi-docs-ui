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
            title: 'Team Flex nav.no APIer',
            version: '1',
            description:
                'Her ser du alle APIer som team flex sine applikasjoner eksponerer ut på nav.no. <br /><br />  Denne dokumentasjonen gjører på samme domene som testmiljøet, slik at innlogging og CORS er så enkelt som mulig. For å være autentisert så logger du inn på  [Ditt Sykefravær](https://www.ekstern.dev.nav.no/syk/sykefravaer/) i testmiljøet i samme nettleser som du ser på denne siden. Da vil det opprettes en sesjon med en cookie som automatisk gjenbrukes dersom du bruker APIene på denne siden.',
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
        tags: [],
    }

    const backendSpecs = await openApiSpecs()

    function parseSpecs(specs: OpenAPI3, prefix: string): void {
        for (const k in specs.paths) {
            spec.paths![prefix + k] = specs.paths[k]
        }
        for (const k in specs.components?.schemas) {
            spec.components!.schemas![k] = specs.components.schemas[k]
        }
        for (const k of specs.tags || []) {
            spec.tags!.push(k)
        }
    }

    parseSpecs(backendSpecs.spinnsynBackend, '/syk/sykepenger/api/spinnsyn-backend')
    parseSpecs(backendSpecs.dittSykefravaerBackend, '/syk/sykefravaer/api/ditt-sykefravaer-backend')
    parseSpecs(backendSpecs.sykepengesoknadBackend, '/syk/sykepengesoknad/api/sykepengesoknad-backend')
    parseSpecs(backendSpecs.sykepengesoknadKvitteringer, '/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer')

    return <SwaggerUI spec={spec} />
}

async function openApiSpecs(): Promise<Specs> {
    if (isLocalOrDemo) {
        return {
            sykepengesoknadBackend: testdata,
            spinnsynBackend: testdata,
            dittSykefravaerBackend: testdata,
            sykepengesoknadKvitteringer: testdata,
        }
    }

    async function fetchApiDocs(app: string): Promise<OpenAPI3> {
        return await (
            await fetch(`http://${app}/v3/api-docs`, {
                next: { revalidate: 60 },
            })
        ).json()
    }

    return {
        sykepengesoknadBackend: await fetchApiDocs('sykepengesoknad-backend'),
        spinnsynBackend: await fetchApiDocs('spinnsyn-backend'),
        dittSykefravaerBackend: await fetchApiDocs('ditt-sykefravaer-backend'),
        sykepengesoknadKvitteringer: await fetchApiDocs('sykepengesoknad-kvitteringer'),
    }
}

interface Specs {
    sykepengesoknadBackend: OpenAPI3
    spinnsynBackend: OpenAPI3
    dittSykefravaerBackend: OpenAPI3
    sykepengesoknadKvitteringer: OpenAPI3
}
