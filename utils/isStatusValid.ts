const VALID_STATUSES = [
    "not started",
    "only analysis done",
    "uncompleted plan",
    "completed",
    "hall of fame"
];

export function isStatusValid(status: string): boolean {
    return VALID_STATUSES.includes(status);
}

