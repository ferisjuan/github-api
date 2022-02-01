// @vendors
import axios from 'axios';

// @constants
import { GITHUB_API_URL } from './constants/github-api';

const fetchGithubData = async (): Promise<[Record<string, unknown>]> => {
    const response = await axios(`${GITHUB_API_URL}/orgs/awslabs/repos`);

    return response.data;
}

const languagesMap = async () => {
    const repos = await fetchGithubData();

    const languages = repos.reduce((acc, repo) => {
        const { language, name } = repo;

            if (language) {
                acc[language as string] = acc[language as string] ? acc[language as string] as number + 1 : 1;
            }

        return acc;
    }, {})

    return languages;
}

const printLanguages = async () => {
    const languages = await languagesMap();

    const languagesList = Object.entries(languages)

    process.stdout.write('\n');
    process.stdout.write('List of languages used in awslabs\' repos:\n');

    languagesList.forEach(
        language => process.stdout.write(`${language[0]} is used in ${language[1]} repos\n`)
    );

    process.stdout.write('\n');

}

printLanguages();
