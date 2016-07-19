import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { provide } from '@angular/core';
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { MyApp } from './app';
import { BooksPage } from './pages/books/books';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// Mock out Ionic's platform class
class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

let myApp = null;

describe('MyApp', () => {

  beforeEachProviders(() => [
    provide(BooksPage, {useClass: MockClass})
  ]);

  beforeEach(function() {
    let platform = (<any>new MockClass());
    myApp = new MyApp(platform);
  });

  it('initialises with Books page', () => {
    expect(myApp).not.toBeNull();
    expect(myApp.rootPage).toBe(BooksPage);
  });
});
