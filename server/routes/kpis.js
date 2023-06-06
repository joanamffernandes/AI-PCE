const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cvmota',
    database: 'dw_cornea',
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

function executeQuery(query, res) {
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erro a executar a query:' + query, error);
            res.status(200).json({success: false, response: 'Erro a executar o pedido: ' + error.message});
        } else {
            res.status(200).json({success: true, response: results});
        }
    });
}

/**
 * Rota para calcular o número de transplantes por tipo de diagnóstico
 */
router.get('/transplantes/diagnostico', async (req, res) => {

    const query = `
    SELECT 
        DIM_Diagnostico.descricao AS diagnostico,
        COUNT(0) AS total_transplantes
    FROM
        FACT_Cornea, DIM_Diagnostico
    WHERE
        FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
    GROUP BY DIM_Diagnostico.descricao
    `;
    await executeQuery(query, res);
});

/**
 *  Rota para calcular o número de transplantes por tipo de procedimento
 */
router.get('/transplantes/procedimento', async (req, res) => {

    const query = `
    SELECT 
        DIM_Tipo_Procedimento.tipo_procedimento AS procedimento,
        COUNT(0) AS total_transplantes
    FROM
        FACT_Cornea, DIM_Tipo_Procedimento
    WHERE
        FACT_Cornea.id_tipo_prodecimento = DIM_Tipo_Procedimento.id
    GROUP BY procedimento
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular o número de transplantes por lateralidade
 */
router.get('/transplantes/lateralidade', async (req, res) => {

    const query = `
    SELECT
        DIM_Lateralidade.descricao AS lateralidade,
        COUNT(0) AS total_transplantes
    FROM
        FACT_Cornea, DIM_Lateralidade 
    WHERE FACT_Cornea.id_lateralidade = DIM_Lateralidade.id
    GROUP BY
        DIM_Lateralidade.descricao
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular o número de transplantes por prioridade
 */
router.get('/transplantes/prioridade', async (req, res) => {

    const query = `
    SELECT
        DIM_Prioridade.descricao AS prioridade ,
        COUNT(0) AS total_transplantes
    FROM
        FACT_Cornea, DIM_Prioridade 
    WHERE FACT_Cornea.id_prioridade = DIM_Prioridade.id
    GROUP BY
        DIM_Prioridade.descricao
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular o número de transplantes por anestesia
 */
router.get('/transplantes/anestesia', async (req, res) => {

    const query = `
    SELECT
        DIM_Anestesia.descricao AS anestesia ,
        COUNT(0) AS total_transplantes
    FROM
        FACT_Cornea, DIM_Anestesia 
    WHERE FACT_Cornea.id_anestesia = DIM_Anestesia.id
    GROUP BY
        DIM_Anestesia.descricao
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular número de transplantes realizados em feriados e fins de semana, por ano
 */
router.get('/transplantes/feriados-fim-de-semana', async (req, res) => {
    let query = `
        SELECT
            YEAR(DIM_Tempo.data_reg) AS ano,
            SUM(CASE WHEN fim_semana = 'S' THEN 1 ELSE 0 END) AS transplantes_fim_semana,
            SUM(CASE WHEN feriado = 'S' THEN 1 ELSE 0 END) AS transplantes_feriado,
            SUM(CASE WHEN feriado = 'N' AND fim_semana = 'N' THEN 1 ELSE 0 END) AS total_transplantes
        FROM FACT_Cornea, DIM_Tempo
        WHERE FACT_Cornea.id_tempo = DIM_Tempo.id
        GROUP BY YEAR(DIM_Tempo.data_reg)
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular número de transplantes  por faixa etária
 */
router.get('/transplantes/idade', async (req, res) => {

    query = ` 
        SELECT idade,
            COUNT(0) AS total_transplantes
        FROM  FACT_Cornea
        GROUP BY idade
        ORDER BY idade
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular o tempo-espera por Ano
 */
router.get('/tempo-espera/transplante/ano', async (req, res) => {

    let query = `
        SELECT 
            YEAR(DIM_Tempo.data_reg) AS ano,
            ROUND(AVG(tempo_espera_cirurgia)) AS tempo_medio_espera
        FROM
            FACT_Cornea,
            DIM_Tempo
        WHERE FACT_Cornea.id_tempo = DIM_Tempo.id
        GROUP BY YEAR(DIM_Tempo.data_reg)
        `;


    await executeQuery(query, res);
});

router.get('/tempo-espera/transplante/mes', async (req, res) => {

    let query = `
    SELECT
        CONCAT(LEFT(MONTHNAME(dw_cornea.DIM_Tempo.data_reg), 3), '.') AS mes,
        ROUND(AVG(tempo_espera_cirurgia)) AS tempo_medio_espera
    FROM
        FACT_Cornea, DIM_Tempo 
    WHERE
        FACT_Cornea.id_tempo = DIM_Tempo.id
    GROUP BY
        MONTH(DIM_Tempo.data_reg),mes
    ORDER BY
        MONTH(DIM_Tempo.data_reg)
    `;

    await executeQuery(query, res);
});


/**
 *  Rota para calcular o tempo-espera para transplante por diagnostico
 */
router.get('/tempo-espera/transplante/diagnostico', async (req, res) => {

    let query = `
    SELECT 
        DIM_Diagnostico.descricao AS diagnostico,
        ROUND(AVG(tempo_espera_cirurgia)) AS tempo_medio_espera
    FROM
        FACT_Cornea, DIM_Diagnostico
    WHERE
        FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
    GROUP BY diagnostico
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular o tempo-espera para consulta de anestesia por diagnostico
 */
router.get('/tempo-espera/anestesia', async (req, res) => {

    let query = `
    SELECT 
        DIM_Diagnostico.descricao AS diagnostico,
        ROUND(AVG(tempo_espera_cirurgia)) AS tempo_espera_transp,
        ROUND(AVG(tempo_espera_anestesia)) AS tempo_espera_anest,
        ROUND(AVG(tempo_espera_anest_cir)) AS tempo_espera_anest_cir
    FROM
        FACT_Cornea, DIM_Diagnostico
    WHERE
        FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
        and tempo_espera_cirurgia > 0
        and tempo_espera_anestesia > 0
        and tempo_espera_anest_cir > 0
    GROUP BY diagnostico
    `;

    await executeQuery(query, res);
});


/**
 *  Rota para calcular o tempo-espera para consulta de anestesia por diagnostico
 */
router.get('/tempo-espera/', async (req, res) => {

    let query = `
    SELECT 
        DIM_Diagnostico.descricao AS diagnostico,
        ROUND(AVG(tempo_espera_cirurgia)) AS tempo_espera_transp       
    FROM
        FACT_Cornea, DIM_Diagnostico
    WHERE
        FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
        and tempo_espera_cirurgia > 0
    GROUP BY diagnostico
    `;

    await executeQuery(query, res);
});


/**
 *  Rota para calcular o tempo-espera entre a consulta de anestesia e a realização da consulta
 */
router.get('/tempo-espera/anestesia/transplante/diagnostico', async (req, res) => {

    let query = `
    SELECT 
        DIM_Diagnostico.descricao AS diagnostico,
        ROUND(AVG(tempo_espera_anest_cir)) AS tempo_medio_espera
    FROM
        FACT_Cornea, DIM_Diagnostico
    WHERE
        FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
    GROUP BY diagnostico
    `;

    await executeQuery(query, res);
});

/**
 *  Rota para calcular total de desistências por tipo de diagnostico
 */
router.get('/motivo/desistencia/diagnostico', async (req, res) => {

    const query = `
     SELECT
        DIM_Diagnostico.descricao as diagnostico,
        COUNT(*) AS total
    FROM
        FACT_Cornea, DIM_Diagnostico, DIM_Motivo
    WHERE FACT_Cornea.id_diagnostico = DIM_Diagnostico.id
        and FACT_Cornea.id_motivo = DIM_Motivo.id 
        and DIM_Motivo.descricao = 'Desistência'
    GROUP BY
        DIM_Diagnostico.descricao
    `

    await executeQuery(query, res);
});

/**
 * Query para calcular total de transplantes não efectuados por ano, para determinado motivo
 */
function getSQLQueryForProcedureReason(reason) {
    return `
    SELECT
        YEAR(DIM_Tempo.data_reg) AS ano,
        COUNT(*) AS total
    FROM
        FACT_Cornea, DIM_Tempo, DIM_Motivo
    WHERE FACT_Cornea.id_tempo = DIM_Tempo.id
        and FACT_Cornea.id_motivo = DIM_Motivo.id 
        and descricao = '${reason}'
    GROUP BY
        YEAR(DIM_Tempo.data_reg)
    `;
}

/**
 *  Rota para calcular total de desistências por ano
 */
router.get('/motivo/desistencia', async (req, res) => {

    const query = getSQLQueryForProcedureReason("Desistência");

    await executeQuery(query, res);
});

/**
 *  Rota para calcular total de transplantes não efectuados por Contra indicação definitiva
 */
router.get('/motivo/cid', async (req, res) => {

    const query = getSQLQueryForProcedureReason("Contra indicação definitiva");

    await executeQuery(query, res);
});

/**
 *  Rota para calcular total de transplantes não efectuados por Contra indicação temporária
 */
router.get('/motivo/cit', async (req, res) => {

    const query = getSQLQueryForProcedureReason("Contra indicação temporária");

    await executeQuery(query, res);
});

/**
 *  Rota para calcular total de transplantes não efectuados por Morte
 */
router.get('/motivo/morte', async (req, res) => {

    const query = getSQLQueryForProcedureReason("Morte");

    await executeQuery(query, res);
});


router.get('/motivo', async (req, res) => {

    const query = `
    SELECT
        YEAR(DIM_Tempo.data_reg) AS ano,
        SUM(CASE WHEN descricao = 'Contra indicação temporária' THEN 1 ELSE 0 END) AS \`Contra indicação temporária\`,
        SUM(CASE WHEN descricao = 'Contra indicação definitiva' THEN 1 ELSE 0 END) AS \`Contra indicação definitiva\`,
        SUM(CASE WHEN descricao = 'Desistência' THEN 1 ELSE 0 END) AS \`Desistência\`,
        SUM(CASE WHEN descricao = 'Morte' THEN 1 ELSE 0 END) AS \`Morte\`
    FROM
        FACT_Cornea, DIM_Tempo, DIM_Motivo
    WHERE
        FACT_Cornea.id_tempo = DIM_Tempo.id
        AND FACT_Cornea.id_motivo = DIM_Motivo.id
        AND descricao != 'Transplantado'
    GROUP BY
        YEAR(DIM_Tempo.data_reg)
    `;

    await executeQuery(query, res);
});


module.exports = router;
