import { POPULATION_DENSITY_TRESHOLD } from '@/modules/incidentrate/helpers/constants';

export const discretize = (valueRange = {}, option = {}) => {
    let classScoring;
    const { value, lowestValue, highestValue } = valueRange;
    const reverseClassification = option?.reverse || false;

    const interval = (highestValue - lowestValue) / 3;
    const classOneConditionFullfiled = (lowestValue <= value) && (value <= (lowestValue + interval));
    const classTwoConditionFullfiled = (lowestValue + interval <= value) && (value <= (lowestValue + (2 * interval)));
    const classThreeConditionFullfiled = ((lowestValue + (2 * interval)) <= value) && (value <= highestValue); 
    // console.log({value, lowestValue, highestValue, interval})
    
    if (!reverseClassification) {
        if (classOneConditionFullfiled) classScoring = 1;
        else if (classTwoConditionFullfiled) classScoring = 2;
        else if (classThreeConditionFullfiled) classScoring = 3;
    } else {
        if (classOneConditionFullfiled) classScoring = 3;
        else if (classTwoConditionFullfiled) classScoring = 2;
        else if (classThreeConditionFullfiled) classScoring = 1;
    }

    return classScoring;
};

export const classifyPopulationDensity = (populationDensity) => {
    let classScoring;
    const classOneConditionFullfiled = populationDensity <= POPULATION_DENSITY_TRESHOLD.LOW;
    const classTwoConditionFullfiled = (POPULATION_DENSITY_TRESHOLD.LOW + 1 <= populationDensity) && (populationDensity <= POPULATION_DENSITY_TRESHOLD.MEDIUM);
    const classThreeConditionFullfiled = POPULATION_DENSITY_TRESHOLD.MEDIUM + 1 <= populationDensity;

    if (classOneConditionFullfiled) classScoring = 1;
    else if (classTwoConditionFullfiled) classScoring = 2;
    else if (classThreeConditionFullfiled) classScoring = 3;

    return classScoring;
};