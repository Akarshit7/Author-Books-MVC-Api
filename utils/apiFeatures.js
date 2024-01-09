class ApiFeatures{
    constructor(books,queryParams){
        this.books = books
        this.queryParams = queryParams

    }

    sortBooks(books, sortBy, sortOrder) {
        return books.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        });
    }

    sort(){
        if(this.queryParams.sortBy){
            const sortOrder = this.queryParams.sortOrder || 'asc';
            this.books = this.sortBooks(this.books,this.queryParams.sortBy,sortOrder)
        }
        return this;
    }
    paginateData(data, pageSize, currentPage) {
        const startIndex = (parseInt(currentPage,10) - 1) * parseInt(pageSize,10);
        const endIndex = startIndex + parseInt(pageSize,10);
        return data.slice(startIndex, endIndex);
    }
    pagination(){
        
        if(this.queryParams.pageSize){
            const page = this.queryParams.page || '1';
            this.books = this.paginateData(this.books,this.queryParams.pageSize,page);
        }
        return this;
    }

    getBooksSize(){
        return this.books.length;
    }

    getBooks(){
        return this.books
    }


}

module.exports = ApiFeatures