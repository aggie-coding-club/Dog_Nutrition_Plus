CREATE DEFINER=`root`@`localhost` PROCEDURE `get_nutDataDef`(
	IN NDB_NoIN varchar(5)
)
BEGIN

SELECT 
    `nut_data`.`NDB_No`,
    `nut_data`.`Nutr_No`,
    `nut_data`.`Nutr_Val`,
    `nut_data`.`Src_Cd`,
    `nut_data`.`Deriv_Cd`,
    `nutr_def`.`Units`,
    `nutr_def`.`Tagname`,
    `nutr_def`.`NutrDesc`
FROM
    `data`.`nut_data`, `data`.`nutr_def`
WHERE
    `nut_data`.NDB_No = NDB_NoIN AND `nutr_def`.`Nutr_No` = `nut_data`.`Nutr_No`;



END