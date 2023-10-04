import * as core from '@actions/core';
import * as github from '@actions/github';

const getVersion = async (version: Array<any>): Promise<Version> => {
    console.log("version:", version);
    return {
        major: parseInt(version[1]),
        minor: parseInt(version[2]),
        patch: parseInt(version[3]),
        manifestSafeVersionString:
            version[1].padStart(2, "0") + "." +
            version[2].padStart(2, "0") + "." +
            version[3].padStart(2, "0")
    };
}

async function run() {
    try {
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
        const branchName: string = github.context.payload.ref;
        const regex = new RegExp(/^release[-\/](\d{1,2})\.(\d{1,2})\.(\d{1,2})$/);
        const releaseInfo = branchName.match(regex)
        if (releaseInfo){
            const version = await getVersion(releaseInfo);
            console.log("version: ", version);
            core.setOutput("major", version.major);
            core.setOutput("minor", version.minor);
            core.setOutput("patch", version.patch);
            core.setOutput("manifestSafeVersionString", version.manifestSafeVersionString);
        }
        else{
            core.setFailed(`The branch name does not match the pattern 'release/nn.nn.nn' or 'release-nn.nn.nn', received ${branchName}`);
        }
    } catch (error: any) {
        core.setFailed(error);
    }
}

run();

interface Version {
    major: number,
    minor: number,
    patch: number,
    manifestSafeVersionString: string
}

export default run;