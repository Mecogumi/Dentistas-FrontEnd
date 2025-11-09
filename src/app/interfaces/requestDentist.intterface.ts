export interface RequestDentist{
    dentistId?:number,
    date?:Date,
    type?: string,
    notes?: string
}

interface Type{
    first_visit:'first_visit'
    follow_up:'first_visit'
}