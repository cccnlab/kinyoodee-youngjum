// This file is module for offline service such as save file, read file, etc with local storage or indexedDB.
// Author : Waragon P.

function saveDataToLocalStorage(key:string, value:any) {
    localStorage.setItem(key, value);
}

function getDataFromLocalStorage(key:string) {
    return localStorage.getItem(key);
}


function saveDataToIndexedDB(data:any, DBname:string) {
    // Create request to open a indexed database
    const IDBrequest: IDBOpenDBRequest = window.indexedDB.open(DBname);
  
    // If error
    IDBrequest.onerror = function(event) {
        console.log("IndexedDB error: " + (event.target as any).errorCode);
    };
  
    // If upgrade needed
    IDBrequest.onupgradeneeded = function(event) {
        const db = IDBrequest.result;
        if (!db.objectStoreNames.contains("data")) {
            db.createObjectStore("data");
        }
    };
  
    // If success
    IDBrequest.onsuccess = function(event) {

        const db = IDBrequest.result;
  
        const transaction = db.transaction(["data"], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore("data");
        const request = objectStore.add(data, new Date().getTime());

        request.onsuccess = function(event) {
            console.log("Data has been added to your database.");
        };

        transaction.oncomplete = function(event) {
            db.close();
        };
        
    };

  }

function getDataFromIndexedDB(DBname:string, DBversion:number, DBstore:string) {

    // Create request to open a indexed database
    const IDBrequest: IDBRequest = window.indexedDB.open(DBname, DBversion);

    // If error
    IDBrequest.onerror = function(event) {
        console.log("IndexedDB error: " + (event.target as any).errorCode);
    };  

    // If success
    IDBrequest.onsuccess = function(event) {
        const db = IDBrequest.result;
        const transaction = db.transaction([DBstore], "readwrite");
        const objectStore = transaction.objectStore(DBstore);
        const request = objectStore.getAll();
        request.onsuccess = function(event) {
            console.log("Data has been added to your database.");
        };
        transaction.oncomplete = function(event) {
            db.close();
        };
    };
}


function saveDataToClientDevice(data: any, filename: string) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('download', filename);
    a.setAttribute('href', url);
    a.click();
}

function saveJSONDataToClientDevice(data: any, filename: string) {
    saveDataToClientDevice(JSON.stringify(data), filename);
}

export {
    saveDataToLocalStorage,
    saveDataToIndexedDB,
    saveDataToClientDevice,
    saveJSONDataToClientDevice,
    getDataFromLocalStorage,
    getDataFromIndexedDB
}