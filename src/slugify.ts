import escapeStringRegexp = require("escape-string-regexp");

interface Options {
  readonly separator?: string;
  readonly lowercase?: boolean;
  readonly decamelize?: boolean;
  readonly preserveLeadingUnderscore?: boolean;
}

const decamelize = (string) => {
  return string
    .replace(/([A-Z]{2,})(\d+)/g, "$1 $2")
    .replace(/([a-z\d]+)([A-Z]{2,})/g, "$1 $2")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1 $2");
};

const removeMootSeparators = (string, separator) => {
  const escapedSeparator = escapeStringRegexp(separator);

  return string
    .replace(new RegExp(`${escapedSeparator}{2,}`, "g"), separator)
    .replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, "g"), "");
};

export const slugify = (string, options?: Options) => {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a string, got \`${typeof string}\``);
  }

  options = {
    separator: "-",
    lowercase: true,
    decamelize: true,
    preserveLeadingUnderscore: false,
    ...options,
  };

  const shouldPrependUnderscore =
    options.preserveLeadingUnderscore && string.startsWith("_");

  if (options.decamelize) {
    string = decamelize(string);
  }

  let patternSlug = /[^a-zA-Z\d]+/g;

  if (options.lowercase) {
    string = string.toLowerCase();
    patternSlug = /[^a-z\d]+/g;
  }

  string = string.replace(patternSlug, options.separator);
  string = string.replace(/\\/g, "");
  string = removeMootSeparators(string, options.separator);

  if (shouldPrependUnderscore) {
    string = `_${string}`;
  }

  return string;
};
