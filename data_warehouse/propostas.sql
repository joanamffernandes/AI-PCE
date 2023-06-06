select * from  dw_cornea.FACT_Cornea; 

-- clear FACT_Cornea
TRUNCATE dw_cornea.FACT_Cornea;
ALTER TABLE dw_cornea.FACT_Cornea AUTO_INCREMENT = 1;

-- SDIM_cod_postal
DELETE FROM dw_cornea.SDIM_cod_postal where id > 0 ;
ALTER TABLE dw_cornea.SDIM_cod_postal AUTO_INCREMENT = 1;
--
insert into dw_cornea.SDIM_cod_postal(cod_postal, cidade)
select POSTAL_CODE, CASE WHEN IFNULL(POSTAL_CODE, 0) = 0 THEN 'NA' ELSE TOWN END from dw_cornea.proposta
group by POSTAL_CODE, TOWN;

-- DIM_paciente
DELETE FROM dw_cornea.DIM_paciente where id > 0 ;
ALTER TABLE dw_cornea.DIM_paciente AUTO_INCREMENT = 1;
--
INSERT INTO dw_cornea.DIM_paciente (id_paciente, nome, data_nasc, genero, id_cod_postal)
SELECT PATIENT_ID,
       PATIENT_NAME,
       DATE_FORMAT(STR_TO_DATE(BIRTH_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS BIRTH_DATE,
       Max(GENDER_TEXT),
       SDIM_cod_postal.id
FROM dw_cornea.proposta, DW_Cornea.SDIM_cod_postal
where dw_cornea.proposta.POSTAL_CODE = dw_cornea.SDIM_cod_postal.cod_postal
GROUP BY PATIENT_ID, PATIENT_NAME, BIRTH_DATE, dw_cornea.SDIM_cod_postal.id;

-- DIM_Prioridade
DELETE FROM dw_cornea.DIM_Prioridade where id > 0 ;
ALTER TABLE dw_cornea.DIM_Prioridade AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Prioridade (descricao)
select PRIORITY_TEXT from dw_cornea.proposta
group by PRIORITY_TEXT;

-- DIM_Diagnostico
DELETE FROM dw_cornea.DIM_Diagnostico where id > 0 ;
ALTER TABLE dw_cornea.DIM_Diagnostico AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Diagnostico (descricao)
select DIAGNOSIS_TEXT from dw_cornea.proposta
group by DIAGNOSIS_TEXT;

 -- DIM_Tipo_Procedimento
DELETE FROM dw_cornea.DIM_Tipo_Procedimento where id > 0 ;
ALTER TABLE dw_cornea.DIM_Tipo_Procedimento AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Tipo_Procedimento (tipo_procedimento, descricao)
select PROCEDURE_TYPE_CODE, PROCEDURE_TYPE_TEXT from dw_cornea.proposta
group by PROCEDURE_TYPE_CODE, PROCEDURE_TYPE_TEXT;

 -- DIM_Lateralidade
DELETE FROM dw_cornea.DIM_Lateralidade where id > 0 ;
ALTER TABLE dw_cornea.DIM_Lateralidade AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Lateralidade (descricao)
select LATERALITY_TEXT from dw_cornea.proposta
group by LATERALITY_TEXT;

 -- DIM_Lateralidade
DELETE FROM dw_cornea.DIM_Anestesia where id > 0 ;
ALTER TABLE dw_cornea.DIM_Anestesia AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Anestesia (descricao)
select ANESTHESIA from dw_cornea.proposta
group by ANESTHESIA;

 -- DIM_Motivo
DELETE FROM dw_cornea.DIM_Motivo where id > 0 ;
ALTER TABLE dw_cornea.DIM_Motivo AUTO_INCREMENT = 1;
--
insert into dw_cornea.DIM_Motivo (descricao)
select PROCEDURE_REASON from dw_cornea.proposta
group by PROCEDURE_REASON;


-- DIM_Tempo
DELETE FROM dw_cornea.DIM_Tempo where id > 0 ;
ALTER TABLE dw_cornea.DIM_Tempo AUTO_INCREMENT = 1;
--
INSERT INTO dw_cornea.DIM_Tempo (data_reg, fim_semana, feriado, semestre)
SELECT
  DATE_FORMAT(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS REGISTRATION_DATE,
  CASE WHEN DAYOFWEEK(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%d')) IN (1, 7) THEN 'S' ELSE 'N' END AS fim_semana,
  CASE WHEN DATE_FORMAT(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%m-%d') 
			IN ('01-01','25-04','01-05','10-06','15-08','05-10','01-11','01-12','08-12','25-12') THEN 'S' ELSE 'N' END AS feriado,
  CASE
    WHEN MONTH(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%d')) BETWEEN 1 AND 6 THEN 1
    WHEN MONTH(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%d')) BETWEEN 7 AND 12 THEN 2
  END AS semestre
FROM dw_cornea.proposta
where REGISTRATION_DATE != ''
GROUP BY REGISTRATION_DATE;

`--
Data Móvel	Sexta-feira Santa
Data Móvel	Corpo de Deus
01-01 de Janeiro	Ano Novo
25-04 de Abril	Revolução dos Cravos
01-05 de Maio	Dia do Trabalho
10-06 de Junho	Dia de Portugal, de Camões e das Comunidades Portuguesas
15-08 de Agosto	Assunção de Nossa Senhora
05-10 de Outubro	Proclamação da República
01-11 de Novembro	Dia de Todos os Santos
01-12 de Dezembro	Restauração da Independência
08-12 de Dezembro	Dia da Imaculada Conceição
25-12 de Dezembro	Natal
--`

-- FACT_Cornea
TRUNCATE dw_cornea.FACT_Cornea;
ALTER TABLE dw_cornea.FACT_Cornea AUTO_INCREMENT = 1;
-- 
INSERT INTO dw_cornea.FACT_Cornea (id_tempo, id_prioridade, id_diagnostico, id_tipo_prodecimento, id_lateralidade, 
			id_anestesia, id_motivo, id_paciente, numero_transplantes, idade, tempo_espera_cirurgia, tempo_espera_anestesia, tempo_espera_anest_cir)
SELECT
    dw_cornea.DIM_Tempo.id,
    dw_cornea.DIM_Prioridade.ID,
    DIM_Diagnostico.id,
    dw_cornea.DIM_Tipo_Procedimento.id,
    dw_cornea.DIM_Lateralidade.id,
    dw_cornea.DIM_Anestesia.id,
    dw_cornea.DIM_Motivo.id,
    dw_cornea.DIM_paciente.id,
    dw_cornea.proposta.NUMBER_OF_TRANSPLANTS,
    TIMESTAMPDIFF(YEAR, dw_cornea.DIM_paciente.data_nasc, DATE_FORMAT(STR_TO_DATE(COMPLETION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d')) AS idade,
    TIMESTAMPDIFF(DAY, dw_cornea.DIM_Tempo.data_reg, DATE_FORMAT(STR_TO_DATE(COMPLETION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d')) AS tempo_espera_cirurgia,
    IFNULL(TIMESTAMPDIFF(DAY, dw_cornea.DIM_Tempo.data_reg, IF(ADMISSION_DATE = '', NULL, 
				DATE_FORMAT(STR_TO_DATE(ADMISSION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d'))), 0) AS tempo_espera_anestesia,
    IFNULL(TIMESTAMPDIFF(DAY, IF(ADMISSION_DATE = '', NULL, DATE_FORMAT(STR_TO_DATE(ADMISSION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d')),
		 DATE_FORMAT(STR_TO_DATE(COMPLETION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d')),0) AS tempo_espera_anest_cir
FROM
    dw_cornea.proposta,
    dw_cornea.DIM_Tempo,
    dw_cornea.DIM_Prioridade,
    DW_Cornea.DIM_Diagnostico,
    dw_cornea.DIM_Tipo_Procedimento,
    dw_cornea.DIM_Lateralidade,
    dw_cornea.DIM_Anestesia,
    dw_cornea.DIM_Motivo,
    dw_cornea.DIM_paciente
WHERE
    REGISTRATION_DATE != '' AND REGISTRATION_DATE IS NOT NULL
    AND DATE_FORMAT(STR_TO_DATE(REGISTRATION_DATE, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') = dw_cornea.DIM_Tempo.data_reg
    AND dw_cornea.proposta.PRIORITY_TEXT = dw_cornea.DIM_Prioridade.descricao
    AND dw_cornea.proposta.DIAGNOSIS_TEXT = dw_cornea.DIM_Diagnostico.descricao
    AND dw_cornea.proposta.PROCEDURE_TYPE_TEXT = dw_cornea.DIM_Tipo_Procedimento.descricao
    AND dw_cornea.proposta.LATERALITY_TEXT = dw_cornea.DIM_Lateralidade.descricao
    AND dw_cornea.proposta.ANESTHESIA = dw_cornea.DIM_Anestesia.descricao
    AND dw_cornea.proposta.PROCEDURE_REASON = dw_cornea.DIM_Motivo.descricao
    AND dw_cornea.proposta.patient_id = dw_cornea.DIM_paciente.id_paciente;
    

select count(*) from dw_cornea.proposta;
select count(*) from dw_cornea.FACT_Cornea;
    
select * from dw_cornea.DIM_Tempo
where feriado ='S';

select * from `DW_Cornea`.`DIM_Tempo`;
select * from `DW_Cornea`.`DIM_Prioridade`;
select * from `DW_Cornea`.`DIM_Diagnostico`;
select * from `DW_Cornea`.`DIM_Tipo_Procedimento`;  
select * from `DW_Cornea`.`DIM_Lateralidade`;
select * from `DW_Cornea`.`DIM_Anestesia`;
select * from `DW_Cornea`.`DIM_Motivo`;
select * from `DW_Cornea`.`DIM_paciente`;
select * from `DW_Cornea`.`SDIM_cod_postal`;
select * from `DW_Cornea`.`FACT_Cornea`;


-- 528665
-- 528665
select * from dw_cornea.proposta
where dw_cornea.proposta.patient_id = '528665';

select * from FACT_Cornea where idade < 0;

select * from DIM_paciente
where id = 636;
select * from proposta
where PATIENT_ID = 636;

SELECT
	MONTH(dw_cornea.DIM_Tempo.data_reg) AS mes,
	ROUND(AVG(tempo_espera_cirurgia)) AS tempo_medio_espera
FROM
	FACT_Cornea, DIM_Tempo 
WHERE
	FACT_Cornea.id_tempo = DIM_Tempo.id
	and  YEAR(dw_cornea.DIM_Tempo.data_reg) = 2010
GROUP BY
	MONTH(dw_cornea.DIM_Tempo.data_reg);
        
select * from proposta where YEAR(proposta.REGISTRATION_DATE) = 2010;

