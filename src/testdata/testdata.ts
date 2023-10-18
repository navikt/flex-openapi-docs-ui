import { OpenAPI3 } from '@/types'

export const testdata: OpenAPI3 = {
    openapi: '3.0.1',
    info: {
        title: 'OpenAPI definition',
        version: 'v0',
    },
    servers: [
        {
            url: 'http://localhost',
            description: 'Generated server url',
        },
    ],
    paths: {
        '/api/v2/soknader/{soknadId}/sporsmal/{sporsmalId}': {
            put: {
                tags: ['soknad-token-x-controller'],
                operationId: 'oppdaterSporsmal',
                parameters: [
                    {
                        name: 'soknadId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'sporsmalId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RSSporsmal',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/RSOppdaterSporsmalResponse',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/v2/soknader/metadata': {
            get: {
                tags: ['soknad-token-x-controller'],
                operationId: 'hentSoknaderMetadata',
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/RSSykepengesoknadMetadata' },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/v2/opprettSoknadUtland': {
            post: {
                tags: ['soknad-token-x-controller'],
                operationId: 'opprettSoknadUtland',
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/RSSykepengesoknad',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            RSSporsmal: {
                required: ['pavirkerAndreSporsmal', 'svar', 'tag', 'undersporsmal'],
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    tag: {
                        type: 'string',
                    },
                    sporsmalstekst: {
                        type: 'string',
                    },
                    undertekst: {
                        type: 'string',
                    },
                    svartype: {
                        type: 'string',
                        enum: [
                            'JA_NEI',
                            'CHECKBOX',
                            'CHECKBOX_GRUPPE',
                            'CHECKBOX_PANEL',
                            'DATO',
                            'PERIODE',
                            'PERIODER',
                            'TIMER',
                            'FRITEKST',
                            'LAND',
                            'IKKE_RELEVANT',
                            'PROSENT',
                            'RADIO_GRUPPE',
                            'RADIO_GRUPPE_TIMER_PROSENT',
                            'RADIO_GRUPPE_UKEKALENDER',
                            'RADIO',
                            'TALL',
                            'COMBOBOX_SINGLE',
                            'COMBOBOX_MULTI',
                            'INFO_BEHANDLINGSDAGER',
                            'KVITTERING',
                            'DATOER',
                            'BELOP',
                            'KILOMETER',
                        ],
                    },
                    min: {
                        type: 'string',
                    },
                    max: {
                        type: 'string',
                    },
                    pavirkerAndreSporsmal: {
                        type: 'boolean',
                    },
                    kriterieForVisningAvUndersporsmal: {
                        type: 'string',
                        enum: ['NEI', 'JA', 'CHECKED'],
                    },
                    svar: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSSvar',
                        },
                    },
                    undersporsmal: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSSporsmal',
                        },
                    },
                },
            },
            RSSvar: {
                required: ['verdi'],
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    verdi: {
                        type: 'string',
                    },
                },
            },
            ArbeidsforholdFraInntektskomponenten: {
                required: ['arbeidsforholdstype', 'navn', 'orgnummer'],
                type: 'object',
                properties: {
                    orgnummer: {
                        type: 'string',
                    },
                    navn: {
                        type: 'string',
                    },
                    arbeidsforholdstype: {
                        type: 'string',
                        enum: ['FRILANSER', 'ARBEIDSTAKER'],
                    },
                },
            },
            RSArbeidsgiver: {
                required: ['navn', 'orgnummer'],
                type: 'object',
                properties: {
                    navn: {
                        type: 'string',
                    },
                    orgnummer: {
                        type: 'string',
                    },
                },
            },
            RSMerknad: {
                required: ['type'],
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    beskrivelse: {
                        type: 'string',
                    },
                },
            },
            RSOppdaterSporsmalResponse: {
                required: ['oppdatertSporsmal'],
                type: 'object',
                properties: {
                    mutertSoknad: {
                        $ref: '#/components/schemas/RSSykepengesoknad',
                    },
                    oppdatertSporsmal: {
                        $ref: '#/components/schemas/RSSporsmal',
                    },
                },
            },
            RSSoknadsperiode: {
                required: ['fom', 'grad', 'tom'],
                type: 'object',
                properties: {
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    grad: {
                        type: 'integer',
                        format: 'int32',
                    },
                    sykmeldingstype: {
                        type: 'string',
                        enum: [
                            'AKTIVITET_IKKE_MULIG',
                            'GRADERT',
                            'BEHANDLINGSDAGER',
                            'AVVENTENDE',
                            'REISETILSKUDD',
                            'UKJENT',
                        ],
                    },
                },
            },
            RSSykepengesoknad: {
                required: ['id', 'klippet', 'opprettetAvInntektsmelding', 'soknadstype', 'utenlandskSykmelding'],
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    sykmeldingId: {
                        type: 'string',
                    },
                    soknadstype: {
                        type: 'string',
                        enum: [
                            'SELVSTENDIGE_OG_FRILANSERE',
                            'OPPHOLD_UTLAND',
                            'ARBEIDSTAKERE',
                            'ARBEIDSLEDIG',
                            'BEHANDLINGSDAGER',
                            'ANNET_ARBEIDSFORHOLD',
                            'REISETILSKUDD',
                            'GRADERT_REISETILSKUDD',
                        ],
                    },
                    status: {
                        type: 'string',
                        enum: [
                            'NY',
                            'SENDT',
                            'FREMTIDIG',
                            'UTKAST_TIL_KORRIGERING',
                            'KORRIGERT',
                            'AVBRUTT',
                            'UTGAATT',
                            'SLETTET',
                        ],
                    },
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    opprettetDato: {
                        type: 'string',
                        format: 'date',
                    },
                    sendtTilNAVDato: {
                        type: 'string',
                        format: 'date-time',
                    },
                    sendtTilArbeidsgiverDato: {
                        type: 'string',
                        format: 'date-time',
                    },
                    avbruttDato: {
                        type: 'string',
                        format: 'date',
                    },
                    startSykeforlop: {
                        type: 'string',
                        format: 'date',
                    },
                    sykmeldingUtskrevet: {
                        type: 'string',
                        format: 'date',
                    },
                    arbeidsgiver: {
                        $ref: '#/components/schemas/RSArbeidsgiver',
                    },
                    korrigerer: {
                        type: 'string',
                    },
                    korrigertAv: {
                        type: 'string',
                    },
                    arbeidssituasjon: {
                        type: 'string',
                        enum: ['selvstendig nÃ¦ringsdrivende', 'frilanser', 'arbeidstaker', 'arbeidsledig', 'annet'],
                    },
                    soknadPerioder: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSSoknadsperiode',
                        },
                    },
                    sporsmal: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSSporsmal',
                        },
                    },
                    egenmeldtSykmelding: {
                        type: 'boolean',
                    },
                    merknaderFraSykmelding: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSMerknad',
                        },
                    },
                    opprettetAvInntektsmelding: {
                        type: 'boolean',
                    },
                    utenlandskSykmelding: {
                        type: 'boolean',
                    },
                    klippet: {
                        type: 'boolean',
                    },
                    inntektskilderDataFraInntektskomponenten: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ArbeidsforholdFraInntektskomponenten',
                        },
                    },
                    korrigeringsfristUtlopt: {
                        type: 'boolean',
                    },
                },
            },
            Cookie: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                    value: {
                        type: 'string',
                    },
                    attributes: {
                        type: 'object',
                        additionalProperties: {
                            type: 'string',
                        },
                    },
                    domain: {
                        type: 'string',
                    },
                    version: {
                        type: 'integer',
                        format: 'int32',
                        deprecated: true,
                    },
                    path: {
                        type: 'string',
                    },
                    comment: {
                        type: 'string',
                        deprecated: true,
                    },
                    httpOnly: {
                        type: 'boolean',
                    },
                    secure: {
                        type: 'boolean',
                    },
                    maxAge: {
                        type: 'integer',
                        format: 'int32',
                    },
                },
            },
            ArbeidsgiverDTO: {
                type: 'object',
                properties: {
                    navn: {
                        type: 'string',
                    },
                    orgnummer: {
                        type: 'string',
                    },
                },
            },
            FravarDTO: {
                type: 'object',
                properties: {
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    type: {
                        type: 'string',
                        enum: ['FERIE', 'PERMISJON', 'UTLANDSOPPHOLD', 'UTDANNING_FULLTID', 'UTDANNING_DELTID'],
                    },
                },
            },
            InntektskildeDTO: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: [
                            'ANDRE_ARBEIDSFORHOLD',
                            'FRILANSER',
                            'SELVSTENDIG_NARINGSDRIVENDE',
                            'SELVSTENDIG_NARINGSDRIVENDE_DAGMAMMA',
                            'JORDBRUKER_FISKER_REINDRIFTSUTOVER',
                            'ANNET',
                            'FOSTERHJEMGODTGJORELSE',
                            'OMSORGSLONN',
                            'ARBEIDSFORHOLD',
                            'FRILANSER_SELVSTENDIG',
                            'STYREVERV',
                        ],
                    },
                    sykmeldt: {
                        type: 'boolean',
                    },
                },
            },
            MerknadDTO: {
                required: ['type'],
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                    },
                    beskrivelse: {
                        type: 'string',
                    },
                },
            },
            PeriodeDTO: {
                type: 'object',
                properties: {
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                },
            },
            SoknadsperiodeDTO: {
                type: 'object',
                properties: {
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    sykmeldingsgrad: {
                        type: 'integer',
                        format: 'int32',
                    },
                    faktiskGrad: {
                        type: 'integer',
                        format: 'int32',
                    },
                    avtaltTimer: {
                        type: 'number',
                        format: 'double',
                    },
                    faktiskTimer: {
                        type: 'number',
                        format: 'double',
                    },
                    sykmeldingstype: {
                        type: 'string',
                        enum: ['AKTIVITET_IKKE_MULIG', 'GRADERT', 'BEHANDLINGSDAGER', 'AVVENTENDE', 'REISETILSKUDD'],
                    },
                    grad: {
                        type: 'integer',
                        format: 'int32',
                    },
                },
            },
            SporsmalDTO: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    tag: {
                        type: 'string',
                    },
                    sporsmalstekst: {
                        type: 'string',
                    },
                    undertekst: {
                        type: 'string',
                    },
                    min: {
                        type: 'string',
                    },
                    max: {
                        type: 'string',
                    },
                    svartype: {
                        type: 'string',
                        enum: [
                            'JA_NEI',
                            'CHECKBOX',
                            'CHECKBOX_GRUPPE',
                            'CHECKBOX_PANEL',
                            'DATO',
                            'PERIODE',
                            'PERIODER',
                            'TIMER',
                            'FRITEKST',
                            'IKKE_RELEVANT',
                            'BEKREFTELSESPUNKTER',
                            'PROSENT',
                            'RADIO_GRUPPE',
                            'RADIO_GRUPPE_TIMER_PROSENT',
                            'RADIO',
                            'TALL',
                            'RADIO_GRUPPE_UKEKALENDER',
                            'LAND',
                            'COMBOBOX_SINGLE',
                            'COMBOBOX_MULTI',
                            'INFO_BEHANDLINGSDAGER',
                            'KVITTERING',
                            'DATOER',
                            'BELOP',
                            'KILOMETER',
                        ],
                    },
                    kriterieForVisningAvUndersporsmal: {
                        type: 'string',
                        enum: ['NEI', 'JA', 'CHECKED'],
                    },
                    svar: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/SvarDTO',
                        },
                    },
                },
            },
            SvarDTO: {
                type: 'object',
                properties: {
                    verdi: {
                        type: 'string',
                    },
                },
            },
            SykepengesoknadDTO: {
                required: ['ettersending', 'fnr', 'id', 'status', 'type'],
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    type: {
                        type: 'string',
                        enum: [
                            'SELVSTENDIGE_OG_FRILANSERE',
                            'OPPHOLD_UTLAND',
                            'ARBEIDSTAKERE',
                            'ANNET_ARBEIDSFORHOLD',
                            'ARBEIDSLEDIG',
                            'BEHANDLINGSDAGER',
                            'REISETILSKUDD',
                            'GRADERT_REISETILSKUDD',
                        ],
                    },
                    status: {
                        type: 'string',
                        enum: ['NY', 'SENDT', 'FREMTIDIG', 'KORRIGERT', 'AVBRUTT', 'SLETTET', 'UTGAATT'],
                    },
                    fnr: {
                        type: 'string',
                    },
                    sykmeldingId: {
                        type: 'string',
                    },
                    arbeidsgiver: {
                        $ref: '#/components/schemas/ArbeidsgiverDTO',
                    },
                    arbeidssituasjon: {
                        type: 'string',
                        enum: ['SELVSTENDIG_NARINGSDRIVENDE', 'FRILANSER', 'ARBEIDSTAKER', 'ARBEIDSLEDIG', 'ANNET'],
                    },
                    korrigerer: {
                        type: 'string',
                    },
                    korrigertAv: {
                        type: 'string',
                    },
                    soktUtenlandsopphold: {
                        type: 'boolean',
                    },
                    arbeidsgiverForskutterer: {
                        type: 'string',
                        enum: ['JA', 'NEI', 'VET_IKKE'],
                    },
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    dodsdato: {
                        type: 'string',
                        format: 'date',
                    },
                    startSyketilfelle: {
                        type: 'string',
                        format: 'date',
                    },
                    arbeidGjenopptatt: {
                        type: 'string',
                        format: 'date',
                    },
                    sykmeldingSkrevet: {
                        type: 'string',
                        format: 'date-time',
                    },
                    opprettet: {
                        type: 'string',
                        format: 'date-time',
                    },
                    opprinneligSendt: {
                        type: 'string',
                        format: 'date-time',
                    },
                    sendtNav: {
                        type: 'string',
                        format: 'date-time',
                    },
                    sendtArbeidsgiver: {
                        type: 'string',
                        format: 'date-time',
                    },
                    egenmeldinger: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PeriodeDTO',
                        },
                    },
                    fravarForSykmeldingen: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PeriodeDTO',
                        },
                    },
                    papirsykmeldinger: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PeriodeDTO',
                        },
                    },
                    fravar: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/FravarDTO',
                        },
                    },
                    andreInntektskilder: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/InntektskildeDTO',
                        },
                    },
                    soknadsperioder: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/SoknadsperiodeDTO',
                        },
                    },
                    sporsmal: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/SporsmalDTO',
                        },
                    },
                    avsendertype: {
                        type: 'string',
                        enum: ['BRUKER', 'SYSTEM'],
                    },
                    ettersending: {
                        type: 'boolean',
                    },
                    mottaker: {
                        type: 'string',
                        enum: ['NAV', 'ARBEIDSGIVER', 'ARBEIDSGIVER_OG_NAV'],
                    },
                    egenmeldtSykmelding: {
                        type: 'boolean',
                    },
                    yrkesskade: {
                        type: 'boolean',
                    },
                    arbeidUtenforNorge: {
                        type: 'boolean',
                    },
                    harRedusertVenteperiode: {
                        type: 'boolean',
                    },
                    behandlingsdager: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'date',
                        },
                    },
                    permitteringer: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/PeriodeDTO',
                        },
                    },
                    merknaderFraSykmelding: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/MerknadDTO',
                        },
                    },
                    egenmeldingsdagerFraSykmelding: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'date',
                        },
                    },
                    merknader: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    sendTilGosys: {
                        type: 'boolean',
                    },
                    utenlandskSykmelding: {
                        type: 'boolean',
                    },
                    medlemskapVurdering: {
                        type: 'string',
                    },
                    forstegangssoknad: {
                        type: 'boolean',
                    },
                },
            },
            RSMottakerResponse: {
                required: ['mottaker'],
                type: 'object',
                properties: {
                    mottaker: {
                        type: 'string',
                        enum: ['NAV', 'ARBEIDSGIVER', 'ARBEIDSGIVER_OG_NAV'],
                    },
                },
            },
            RSSykepengesoknadMetadata: {
                required: ['id', 'opprettetAvInntektsmelding', 'soknadstype'],
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    sykmeldingId: {
                        type: 'string',
                    },
                    soknadstype: {
                        type: 'string',
                        enum: [
                            'SELVSTENDIGE_OG_FRILANSERE',
                            'OPPHOLD_UTLAND',
                            'ARBEIDSTAKERE',
                            'ARBEIDSLEDIG',
                            'BEHANDLINGSDAGER',
                            'ANNET_ARBEIDSFORHOLD',
                            'REISETILSKUDD',
                            'GRADERT_REISETILSKUDD',
                        ],
                    },
                    status: {
                        type: 'string',
                        enum: [
                            'NY',
                            'SENDT',
                            'FREMTIDIG',
                            'UTKAST_TIL_KORRIGERING',
                            'KORRIGERT',
                            'AVBRUTT',
                            'UTGAATT',
                            'SLETTET',
                        ],
                    },
                    fom: {
                        type: 'string',
                        format: 'date',
                    },
                    tom: {
                        type: 'string',
                        format: 'date',
                    },
                    opprettetDato: {
                        type: 'string',
                        format: 'date',
                    },
                    sendtTilNAVDato: {
                        type: 'string',
                        format: 'date-time',
                    },
                    sendtTilArbeidsgiverDato: {
                        type: 'string',
                        format: 'date-time',
                    },
                    avbruttDato: {
                        type: 'string',
                        format: 'date',
                    },
                    startSykeforlop: {
                        type: 'string',
                        format: 'date',
                    },
                    sykmeldingUtskrevet: {
                        type: 'string',
                        format: 'date',
                    },
                    arbeidsgiver: {
                        $ref: '#/components/schemas/RSArbeidsgiver',
                    },
                    korrigerer: {
                        type: 'string',
                    },
                    korrigertAv: {
                        type: 'string',
                    },
                    arbeidssituasjon: {
                        type: 'string',
                        enum: ['selvstendig nÃ¦ringsdrivende', 'frilanser', 'arbeidstaker', 'arbeidsledig', 'annet'],
                    },
                    soknadPerioder: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSSoknadsperiode',
                        },
                    },
                    egenmeldtSykmelding: {
                        type: 'boolean',
                    },
                    merknaderFraSykmelding: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/RSMerknad',
                        },
                    },
                    opprettetAvInntektsmelding: {
                        type: 'boolean',
                    },
                },
            },
        },
    },
}
