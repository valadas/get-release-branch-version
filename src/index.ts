import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        core.setCommandEcho(true);
        const event = github.context.eventName;
        if (event !== "create"){
            core.setFailed("This action is only meant to be run on create");
        }
        console.log(github.context);

        core.setCommandEcho(false);
    } catch (error) {
        core.setFailed(error);
    }
}

run();

export default run;