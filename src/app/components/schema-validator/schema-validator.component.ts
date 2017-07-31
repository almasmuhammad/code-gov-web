import { Component } from '@angular/core';
import Ajv from 'ajv';
const ajv = new Ajv();

ajv.addSchema('2.0.0', require('../../schemas/2.0.0.json'));

ajv.validate('2.0.0', {
    "version":"2.0.0",
    "agency": "DOABC",
    "releases": [
        {
            "name": "mygov",
            "organization": "XYZ Department",
            "description": "A Platform for Connecting People and Government",
            "licenses": [{
              "URL": "https://path.to/license",
              "name": "CC0"

            }],
            "permissions":{
              "usageType":"open",
              "exemptionText": null
            },


            "tags": [
              "platform",
              "government",
              "connecting",
              "people"
            ],
            "contact": {
              "email": "release@agency.gov",
              "name": "Project Coordinator Name",
              "URL": "https://twitter.com/projectname",
              "phone": "2025551313"
            },
            "status": "Alpha",
            "vcs": "git",
            "repositoryURL": "https://github.com/presidential-innovation-fellows/mygov",
            "homepageURL": "https://agency.gov/project-homepage",
            "downloadURL": "https://agency.gov/project/dist.tar.gz",
            "languages": [
              "java",
              "python"
            ],
            "laborHours": "1000",
            "measurementType": "linesOfcode",
            "partners": [
                {
                    "name": "DOXYZ",
                    "email": "releaseContact1@doxyz.gov"
                }
            ],

            "date": {
                "created": "2016-04-12",
                "lastModified": "2016-04-12",
                "metadataLastUpdated": "2016-04-13"

            }
        }
    ]
});

@Component({
  selector: 'schema-validator',
})

export class SchemaValidatorComponent {

  constructor() {
  }
}
