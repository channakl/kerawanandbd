import { POPULATION_DENSITY_TRESHOLD } from '@/modules/incidentrate/helpers/constants';
import { DENSITY_TRESHOLD } from '@/modules/incidentrate/helpers/constants';

export const discretize = (valueRange = {}, option = {}) => {
    let classScoring;
    const { value, lowestValue, highestValue } = valueRange;
    const reverseClassification = option?.reverse || false;

    const interval = (highestValue - lowestValue) / 3;
    const classOneConditionFullfiled = (lowestValue <= value) && (value <= (lowestValue + interval));
    const classTwoConditionFullfiled = (lowestValue + interval <= value) && (value <= (lowestValue + (2 * interval)));
    const classThreeConditionFullfiled = ((lowestValue + (2 * interval)) <= value) && (value <= highestValue); 
    
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

export const classifyByTresholdRange = (value, option = {}) => {
    let classScoring;
    const classOneConditionFullfiled = value <= option?.lowestTreshold;
    const classTwoConditionFullfiled = (option?.lowestTreshold + 1 <= value) && (value <= option?.middleTreshold);
    const classThreeConditionFullfiled = option?.middleTreshold + 1 <= value;

    if (classOneConditionFullfiled) classScoring = 1;
    else if (classTwoConditionFullfiled) classScoring = 2;
    else if (classThreeConditionFullfiled) classScoring = 3;

    return classScoring;
}