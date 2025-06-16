import neo4j, { Driver } from "neo4j-driver";

export function createDriver(): Driver {
    return neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'wpl_pass')
    );
}

