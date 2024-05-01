// Responsible for populating the database with questions if they do not exist
// this way, anyone who has this project gets synchronized with the common questions
import {PopulateQuestionsData} from './populateQuestionsData';

export async function populateDBWithQuestions() {
    const populate = new PopulateQuestionsData();
    await populate.populatePersonsTable();
    await populate.populateResourcesTable();
    await populate.populateSystemsProcess();
}

