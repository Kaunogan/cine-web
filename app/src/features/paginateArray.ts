/*
|--------------------------------------------------------------------------
| Paginate Array
|--------------------------------------------------------------------------
|
| This feature allows to create a pagination according to the table passed
| in parameter
|
*/
export default function paginateArray(array: any, nbOfElement: number, pageNumber: number) {
  return array.slice((pageNumber - 1) * nbOfElement, pageNumber * nbOfElement)
}
