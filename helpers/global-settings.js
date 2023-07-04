import fs from 'fs'
import { join } from 'path'
import {parseMdFile, dataDirectory} from './markdown'

const settingsDirectory = join(dataDirectory, 'global-settings')

const getAllSettingsSlugs = () => {
    return fs.readdirSync(settingsDirectory).filter(f => f.endsWith('.md'))
}

const getAllSettings = () => {
    return getAllSettingsSlugs().map(f => parseMdFile(`global-settings/${f}`))
}

export {
    getAllSettingsSlugs,
    getAllSettings,
}