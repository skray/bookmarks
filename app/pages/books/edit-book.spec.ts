import { beforeEach, beforeEachProviders, describe, expect, injectAsync, it } from '@angular/core/testing';
import { provide, Type } from '@angular/core';
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { EditBookModal } from './edit-book';
import * as storager from '../../storager/storager';
import { Book } from './Book';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';

let editBookModal:EditBookModal = null;
let editBookModalFixture:ComponentFixture<Type> = null;

class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

class MockNavParams {
  public get(name:string): any {
    return null;
  }
}

describe('MyApp', () => {

  beforeEachProviders(() => [
    provide(NavParams, {useClass: MockNavParams}),
    provide(ViewController, {useClass: MockClass}),
    provide(Platform, {useClass: MockClass}),
    Book
  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(EditBookModal)
      .then((componentFixture: ComponentFixture<Type>) => {
        editBookModalFixture = componentFixture;
        editBookModal = componentFixture.componentInstance;
        editBookModalFixture.detectChanges();
      })
      .catch((err) => {
        console.error('ERROR - An error has occurred inside a promise! ' + err);
        // throw the error out to the console - http://stackoverflow.com/a/30741722
        setTimeout(function(): void { throw err; });
      });
  }));

  it('initialises', () => {
    expect(editBookModal).not.toBeNull();
    expect(editBookModalFixture).not.toBeNull();
  });
});
