import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        core.setCommandEcho(true);
        const event = github.context.eventName;
        console.log(event);
        core.setCommandEcho(false);
    } catch (error) {
        core.setFailed(error);
    }
}

run();

export default run;