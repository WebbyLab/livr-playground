'use strict';
import LIVR from 'livr';
import allExtraRules from 'livr-extra-rules';
import jsonUtils from './jsonUtils';

LIVR.Validator.defaultAutoTrim(true);

// livr 2.13 implements LIVR 2.5, which has some of the extra rules built in (uuid, boolean,
// iso_date, ...). Register only the extra rules that LIVR does not define, so the built-in rules
// are not replaced. instance_of and has_methods need JavaScript objects, which JSON input can't contain.
const builtInRules = LIVR.Validator.getDefaultRules();
const jsOnlyRules = ['instance_of', 'has_methods'];
export const extraRuleNames = Object.keys(allExtraRules)
  .filter(name => !(name in builtInRules) && !jsOnlyRules.includes(name));

LIVR.Validator.registerDefaultRules(
  Object.fromEntries(extraRuleNames.map(name => [name, allExtraRules[name]]))
);

function parse(text, source, fallback) {
  if (!text.trim()) return fallback;
  try {
    return jsonUtils.parse(text);
  } catch (e) {
    // relaxed-json gives the line; errors that come from JSON.parse have it only in the message
    const match = /\s*at position \d+ \(line (\d+) column \d+\)$/.exec(e.message);
    const error = new Error(match ? e.message.slice(0, match.index) : e.message);
    error.source = source;
    error.line = e.line || (match && Number(match[1]));
    throw error;
  }
}

// Counts the error codes in a LIVR errors object, which can nest objects and lists
function countErrors(errors) {
  if (errors === null || errors === undefined) return 0;
  if (typeof errors === 'string') return 1;
  return Object.values(errors).reduce((sum, value) => sum + countErrors(value), 0);
}

// Returns one of:
//   { status: 'valid', output }
//   { status: 'invalid', errors, count }
//   { status: 'error', source: 'rules' | 'aliases' | 'data', message, line }
export function validate(rulesText, dataText, aliasesText) {
  let source = 'rules';
  try {
    const rules = parse(rulesText, 'rules', {});
    const aliases = parse(aliasesText, 'aliases', []);
    const data = parse(dataText, 'data', {});

    if (!Array.isArray(aliases)) {
      throw Object.assign(new Error('Aliases must be a list: [{ name, rules, error }, ...]'), { source: 'aliases' });
    }

    const validator = new LIVR.Validator(rules);
    source = 'aliases';
    aliases.forEach(alias => validator.registerAliasedRule(alias));
    source = 'rules';
    validator.prepare();

    const output = validator.validate(data);
    if (output) return { status: 'valid', output };

    const errors = validator.getErrors();
    return { status: 'invalid', errors, count: countErrors(errors) };
  } catch (e) {
    return {
      status: 'error',
      source: e.source || source,
      message: String(e.message || e).replace(/^LIVR: /, ''),
      line: e.line
    };
  }
}

export { LIVR };
