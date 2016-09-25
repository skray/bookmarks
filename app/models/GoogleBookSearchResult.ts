import { Injectable } from '@angular/core';

@Injectable()
export class GoogleBookSearchResult {
  constructor(
    public title: string,
    public author: string,
    public description: string,
    public publishedYear: string,
    public thumbnailUrl:string
  ){}
}
