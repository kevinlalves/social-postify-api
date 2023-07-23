import { ConfigFactory, ConfigObject } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default (): ConfigFactory[] => {
  const commonYamlText = readFileSync(join(__dirname, 'settings.yml'), 'utf8');
  const environmentYamlText = readFileSync(join(__dirname, 'settings', `${process.env.NODE_ENV}.yml`), 'utf8');
  const commonConfig = yaml.load(commonYamlText);
  const environmentConfig = yaml.load(environmentYamlText);

  return [() => replaceEnvVariables(environmentConfig), () => replaceEnvVariables(commonConfig)];
};

function replaceEnvVariables(obj: ConfigObject): ConfigObject {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      replaceEnvVariables(obj[k]);
    } else if (typeof obj[k] === 'string') {
      obj[k] = obj[k].replace(/\$\{(.+?)\}/g, (_, envVar: string) => {
        if (process.env[envVar] === undefined) throw new Error(`Environment variable ${envVar} is not defined`);

        return process.env[envVar];
      });
    }
  }
  return obj;
}
