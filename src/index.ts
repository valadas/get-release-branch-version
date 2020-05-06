import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        core.setCommandEcho(true);
        const event = github.context.eventName;
        if (event !== "create"){
            core.setFailed("This action is only meant to be run on create");
            return;
        }
        const refType = github.context.payload.ref_type;
        if (refType !== "branch"){
            core.setFailed("This action is only meant to be run on the creation of a new branch");
            return;
        }

        // Grab the branch version
        console.log(github.context.payload.ref);

        core.setCommandEcho(false);
    } catch (error) {
        core.setFailed(error);
    }
}

run();

export default run;