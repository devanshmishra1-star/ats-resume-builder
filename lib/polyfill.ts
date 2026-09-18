if (typeof process !== 'undefined' && typeof process.cwd !== 'function') {
  process.cwd = () => process.env.LAMBDA_TASK_ROOT || process.env.PWD || '/var/task';
}
