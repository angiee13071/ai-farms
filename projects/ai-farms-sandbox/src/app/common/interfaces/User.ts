interface User {
  "username": string,
  "country_code": string,
  "phone": string,
  "person": {
    "image": string | null,
    "first_name": string,
    "last_name": string,
    "date_birth": Date | null,
    "sex": string | null,
    "history": string,
    "own_code": string,
    "referred_code": string | null,
    "language": string | null,
    "description": string,
    "review": number,
    "total_producers": number,
    "total_families": number,
    "is_visible": boolean,
    "total_mothers_head": number,
    "total_family_group": number,
    "ethnic_groups": string,
    "certifications": any[],
    "user": number
  },
  "email": string,
  "id": number,
  "groups": number[],
  "company": number,
  "is_active": boolean
}
export default User;
