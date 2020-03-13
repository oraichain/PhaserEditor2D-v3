declare namespace colibri {
    abstract class Plugin {
        private _id;
        constructor(id: string);
        getId(): string;
        starting(): Promise<void>;
        started(): Promise<void>;
        registerExtensions(registry: ExtensionRegistry): void;
        getIcon(name: string): ui.controls.IImage;
        getJSON(pathInPlugin: string): Promise<any>;
    }
}
declare namespace colibri {
    class Platform {
        private static _plugins;
        private static _extensionRegistry;
        static addPlugin(plugin: colibri.Plugin): void;
        static getPlugins(): Plugin[];
        static getExtensionRegistry(): ExtensionRegistry;
        static getExtensions<T extends Extension>(point: string): T[];
        static addExtension(...extensions: Extension[]): void;
        static getWorkbench(): ui.ide.Workbench;
        static start(): Promise<void>;
    }
}
declare namespace colibri.ui.controls {
    const EVENT_CONTROL_LAYOUT = "controlLayout";
    class Control extends EventTarget {
        private _bounds;
        private _element;
        private _children;
        private _layout;
        private _container;
        private _scrollY;
        private _layoutChildren;
        private _handlePosition;
        constructor(tagName?: string, ...classList: string[]);
        static getControlOf(element: HTMLElement): Control;
        isHandlePosition(): boolean;
        setHandlePosition(_handlePosition: boolean): void;
        get style(): CSSStyleDeclaration;
        isLayoutChildren(): boolean;
        setLayoutChildren(layout: boolean): void;
        getScrollY(): number;
        setScrollY(scrollY: number): void;
        getContainer(): Control;
        getLayout(): ILayout;
        setLayout(layout: ILayout): void;
        addClass(...tokens: string[]): void;
        removeClass(...tokens: string[]): void;
        containsClass(className: string): boolean;
        getElement(): HTMLElement;
        getControlPosition(windowX: number, windowY: number): {
            x: number;
            y: number;
        };
        containsLocalPoint(x: number, y: number): boolean;
        setBounds(bounds: IBounds): void;
        setBoundsValues(x: number, y: number, w: number, h: number): void;
        getBounds(): IBounds;
        setLocation(x: number, y: number): void;
        layout(): void;
        dispatchLayoutEvent(): void;
        add(control: Control): void;
        protected onControlAdded(): void;
        getChildren(): Control[];
    }
}
declare namespace colibri.ui.controls {
    const EVENT_SELECTION_CHANGED = "selectionChanged";
    const EVENT_THEME_CHANGED = "themeChanged";
    enum PreloadResult {
        NOTHING_LOADED = 0,
        RESOURCES_LOADED = 1
    }
    const ICON_SIZE = 16;
    class Controls {
        private static _images;
        private static _applicationDragData;
        static setDragEventImage(e: DragEvent, render: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void;
        static getApplicationDragData(): any[];
        static getApplicationDragDataAndClean(): any[];
        static setApplicationDragData(data: any[]): void;
        static resolveAll(list: Array<Promise<PreloadResult>>): Promise<PreloadResult>;
        static resolveResourceLoaded(): Promise<PreloadResult>;
        static resolveNothingLoaded(): Promise<PreloadResult>;
        static getImage(url: string, id: string): IImage;
        static openUrlInNewPage(url: string): void;
        static createIconElement(icon?: IImage, size?: number): HTMLCanvasElement;
        static LIGHT_THEME: ITheme;
        static DARK_THEME: ITheme;
        static _theme: ITheme;
        static switchTheme(): ITheme;
        static setTheme(theme: ITheme): void;
        static getTheme(): ITheme;
        static drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number): void;
    }
}
declare namespace colibri.ui.ide {
    const EVENT_PART_DEACTIVATED = "partDeactivated";
    const EVENT_PART_ACTIVATED = "partActivated";
    const EVENT_EDITOR_DEACTIVATED = "editorDeactivated";
    const EVENT_EDITOR_ACTIVATED = "editorActivated";
    const EVENT_PROJECT_OPENED = "projectOpened";
    class Workbench extends EventTarget {
        private static _workbench;
        static getWorkbench(): Workbench;
        private _fileStringCache;
        private _fileImageCache;
        private _fileImageSizeCache;
        private _activeWindow;
        private _contentType_icon_Map;
        private _fileStorage;
        private _contentTypeRegistry;
        private _activePart;
        private _activeEditor;
        private _activeElement;
        private _editorRegistry;
        private _commandManager;
        private _windows;
        private _globalPreferences;
        private _projectPreferences;
        private _editorSessionStateRegistry;
        private constructor();
        getEditorSessionStateRegistry(): Map<string, any>;
        getGlobalPreferences(): core.preferences.Preferences;
        getProjectPreferences(): core.preferences.Preferences;
        launch(): Promise<void>;
        private resetCache;
        openProject(projectName: string, monitor: controls.IProgressMonitor): Promise<void>;
        private preloadProjectResources;
        private registerWindows;
        getWindows(): WorkbenchWindow[];
        activateWindow(id: string): WorkbenchWindow;
        private preloadIcons;
        private registerContentTypeIcons;
        private initCommands;
        private initEvents;
        private registerEditors;
        getFileStringCache(): core.io.FileStringCache;
        getFileStorage(): core.io.IFileStorage;
        getCommandManager(): commands.CommandManager;
        getActiveDialog(): controls.dialogs.Dialog;
        getActiveWindow(): WorkbenchWindow;
        getActiveElement(): HTMLElement;
        getActivePart(): Part;
        getActiveEditor(): EditorPart;
        setActiveEditor(editor: EditorPart): void;
        /**
         * Users may not call this method. This is public only for convenience.
         */
        setActivePart(part: Part): void;
        private toggleActivePartClass;
        private findTabPane;
        private registerContentTypes;
        findPart(element: HTMLElement): Part;
        getContentTypeRegistry(): core.ContentTypeRegistry;
        getProjectRoot(): core.io.FilePath;
        getContentTypeIcon(contentType: string): controls.IImage;
        getFileImage(file: core.io.FilePath): FileImage;
        getFileImageSizeCache(): ImageSizeFileCache;
        getWorkbenchIcon(name: string): any;
        getEditorRegistry(): EditorRegistry;
        getEditors(): EditorPart[];
        createEditor(input: IEditorInput): EditorPart;
        getEditorInputExtension(input: IEditorInput): EditorInputExtension;
        getEditorInputExtensionWithId(id: string): EditorInputExtension;
        openEditor(input: IEditorInput): EditorPart;
    }
}
declare namespace colibri {
    const ICON_FILE = "file";
    const ICON_FOLDER = "folder";
    const ICON_PLUS = "plus";
    const ICON_MINUS = "minus";
    const ICON_CHECKED = "checked";
    const ICON_KEYMAP = "keymap";
    const ICON_CONTROL_TREE_COLLAPSE = "tree-collapse";
    const ICON_CONTROL_TREE_EXPAND = "tree-expand";
    const ICON_CONTROL_CLOSE = "close";
    const ICON_CONTROL_DIRTY = "dirty";
    class ColibriPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): any;
        private _openingProject;
        private constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
    }
}
declare namespace colibri {
    class Extension {
        static DEFAULT_PRIORITY: number;
        private _extensionPoint;
        private _priority;
        constructor(extensionPoint: string, priority?: number);
        getExtensionPoint(): any;
        getPriority(): number;
        setPriority(priority: number): void;
    }
}
declare namespace colibri {
    class ExtensionRegistry {
        private _map;
        constructor();
        addExtension(...extensions: Extension[]): void;
        getExtensions<T extends Extension>(point: string): T[];
    }
}
declare namespace colibri.core {
    class ContentTypeExtension extends Extension {
        static POINT_ID: string;
        private _resolvers;
        constructor(resolvers: core.IContentTypeResolver[], priority?: number);
        getResolvers(): IContentTypeResolver[];
    }
}
declare namespace colibri.core.io {
    type GetFileContent<T> = (file: FilePath) => Promise<T>;
    type SetFileContent<T> = (file: FilePath, content: T) => Promise<void>;
    class FileContentCache<T> {
        private _backendGetContent;
        private _backendSetContent;
        private _map;
        private _preloadMap;
        constructor(getContent: GetFileContent<T>, setContent?: SetFileContent<T>);
        reset(): void;
        preload(file: FilePath, force?: boolean): Promise<ui.controls.PreloadResult>;
        getContent(file: FilePath): T;
        setContent(file: FilePath, content: T): Promise<void>;
        hasFile(file: FilePath): boolean;
    }
    class ContentEntry<T> {
        content: T;
        modTime: number;
        constructor(content: T, modTime: number);
    }
}
declare namespace colibri.core {
    class ContentTypeFileCache extends io.FileContentCache<string> {
        constructor(registry: ContentTypeRegistry);
    }
}
declare namespace colibri.core {
    class ContentTypeRegistry {
        private _resolvers;
        private _cache;
        constructor();
        resetCache(): void;
        registerResolver(resolver: IContentTypeResolver): void;
        getResolvers(): IContentTypeResolver[];
        getCachedContentType(file: io.FilePath): string;
        preloadAndGetContentType(file: io.FilePath): Promise<string>;
        preload(file: io.FilePath): Promise<ui.controls.PreloadResult>;
    }
}
declare namespace colibri.core {
    abstract class ContentTypeResolver implements IContentTypeResolver {
        private _id;
        constructor(id: string);
        getId(): string;
        abstract computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.core {
    const CONTENT_TYPE_ANY = "any";
    interface IContentTypeResolver {
        getId(): string;
        computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.core.io {
    interface IFileData {
        name: string;
        isFile: boolean;
        size: number;
        modTime: number;
        children?: IFileData[];
    }
}
declare namespace colibri.core.io {
    class FilePath {
        private _parent;
        private _name;
        private _nameWithoutExtension;
        private _isFile;
        private _files;
        private _ext;
        private _modTime;
        private _fileSize;
        private _alive;
        constructor(parent: FilePath, fileData: IFileData);
        _sort(): void;
        _setName(name: string): void;
        getExtension(): string;
        getSize(): number;
        _setSize(size: number): void;
        getName(): string;
        getNameWithoutExtension(): string;
        getModTime(): number;
        _setModTime(modTime: number): void;
        getFullName(): string;
        getProjectRelativeName(): any;
        getUrl(): any;
        getProject(): FilePath;
        getSibling(name: string): FilePath;
        getFile(name: string): FilePath;
        getParent(): FilePath;
        isFile(): boolean;
        isFolder(): boolean;
        getFiles(): FilePath[];
        _setAlive(alive: boolean): void;
        isAlive(): boolean;
        visit(visitor: (file: FilePath) => void): void;
        _add(file: FilePath): void;
        _remove(): void;
        flatTree(files: FilePath[], includeFolders: boolean): FilePath[];
        toString(): any;
        toStringTree(): string;
        private toStringTree2;
    }
}
declare namespace colibri.core.io {
    interface IRenameData {
        oldName: string;
        newFile: FilePath;
    }
    class FileStorageChange {
        private _renameRecords_fromPath;
        private _renameRecords_toPath;
        private _renameFromToMap;
        private _deletedRecords;
        private _addedRecords;
        private _modifiedRecords;
        private _fullProjectReload;
        constructor();
        fullProjectLoaded(): void;
        isFullProjectReload(): any;
        recordRename(fromPath: string, toPath: string): void;
        getRenameTo(fromPath: string): any;
        isRenamed(fromPath: string): boolean;
        wasRenamed(toPath: string): boolean;
        getRenameToRecords(): Set<string>;
        getRenameFromRecords(): Set<string>;
        recordDelete(path: string): void;
        isDeleted(path: string): boolean;
        getDeleteRecords(): Set<string>;
        recordAdd(path: string): void;
        isAdded(path: string): boolean;
        getAddRecords(): Set<string>;
        recordModify(path: string): void;
        isModified(path: string): boolean;
        getModifiedRecords(): Set<string>;
    }
}
declare namespace colibri.core.io {
    class FileStringCache extends FileContentCache<string> {
        constructor(storage: IFileStorage);
    }
}
declare namespace colibri.core.io {
    function apiRequest(method: string, body?: any): Promise<any>;
    class FileStorage_HTTPServer implements IFileStorage {
        private _root;
        private _changeListeners;
        private _projectName;
        private _hash;
        constructor();
        private registerDocumentVisibilityListener;
        private updateWithServerChanges;
        addChangeListener(listener: ChangeListenerFunc): void;
        removeChangeListener(listener: ChangeListenerFunc): void;
        getRoot(): FilePath;
        openProject(projectName: string): Promise<FilePath>;
        isValidAccount(): Promise<string>;
        getProjectTemplates(): Promise<ProjectTemplatesData>;
        createProject(templatePath: string, projectName: string): Promise<boolean>;
        reload(): Promise<void>;
        private fireChange;
        getProjects(): Promise<string[]>;
        createFile(folder: FilePath, fileName: string, content: string): Promise<FilePath>;
        createFolder(container: FilePath, folderName: string): Promise<FilePath>;
        getFileString(file: FilePath): Promise<string>;
        setFileString(file: FilePath, content: string): Promise<void>;
        private setFileString_priv;
        deleteFiles(files: FilePath[]): Promise<void>;
        renameFile(file: FilePath, newName: string): Promise<void>;
        copyFile(fromFile: FilePath, toFolder: FilePath): Promise<FilePath>;
        moveFiles(movingFiles: FilePath[], moveTo: FilePath): Promise<void>;
        uploadFile(uploadFolder: FilePath, htmlFile: File): Promise<FilePath>;
        getImageSize(file: FilePath): Promise<ImageSize>;
    }
}
declare namespace colibri.core.io {
    type ChangeListenerFunc = (change: FileStorageChange) => void;
    type ProjectTemplatesData = {
        providers: Array<{
            name: string;
            templates: {
                name: string;
                path: string;
            };
        }>;
    };
    type ImageSize = {
        width: number;
        height: number;
    };
    interface IFileStorage {
        reload(): Promise<void>;
        getProjects(): Promise<string[]>;
        openProject(projectName: string): Promise<FilePath>;
        isValidAccount(): Promise<string>;
        getProjectTemplates(): Promise<ProjectTemplatesData>;
        createProject(templatePath: string, projectName: string): Promise<boolean>;
        getRoot(): FilePath;
        getFileString(file: FilePath): Promise<string>;
        setFileString(file: FilePath, content: string): Promise<void>;
        createFile(container: FilePath, fileName: string, content: string): Promise<FilePath>;
        createFolder(container: FilePath, folderName: string): Promise<FilePath>;
        deleteFiles(files: FilePath[]): Promise<void>;
        renameFile(file: FilePath, newName: string): Promise<void>;
        moveFiles(movingFiles: FilePath[], moveTo: FilePath): Promise<void>;
        copyFile(fromFile: FilePath, toFile: FilePath): Promise<FilePath>;
        uploadFile(uploadFolder: FilePath, file: File): Promise<FilePath>;
        getImageSize(file: FilePath): Promise<ImageSize>;
        addChangeListener(listener: ChangeListenerFunc): void;
        removeChangeListener(listener: ChangeListenerFunc): void;
    }
}
declare namespace colibri.core.io {
    type SyncFileContentBuilder<T> = (file: FilePath) => T;
    class SyncFileContentCache<T> {
        private _getContent;
        private _map;
        constructor(builder: SyncFileContentBuilder<T>);
        reset(): void;
        getContent(file: FilePath): T;
        hasFile(file: FilePath): boolean;
    }
}
declare namespace colibri.core.json {
    function write(data: any, name: string, value: any, defaultValue?: any): void;
    function read(data: any, name: string, defaultValue?: any): any;
    function getDataValue(data: any, key: string): any;
    function setDataValue(data: any, key: string, value: any): void;
}
declare namespace colibri.core.preferences {
    class Preferences {
        private _preferencesSpace;
        constructor(preferencesSpace: string);
        private readData;
        getPreferencesSpace(): string;
        setValue(key: string, jsonData: any): void;
        getValue(key: string, defaultValue?: any): any;
    }
}
declare namespace colibri.lang {
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}
declare namespace colibri.ui.controls {
    const EVENT_ACTION_CHANGED = "actionChanged";
    interface IActionConfig {
        text?: string;
        tooltip?: string;
        icon?: IImage;
        enabled?: boolean;
        showText?: boolean;
        commandId?: string;
        selected?: boolean;
        callback?(): void;
    }
    class Action extends EventTarget {
        private _text;
        private _tooltip;
        private _commandId;
        private _icon;
        private _enabled;
        private _showText;
        private _selected;
        private _callback;
        constructor(config: IActionConfig);
        isSelected(): boolean;
        setSelected(selected: boolean): void;
        getCommandId(): string;
        getCommandKeyString(): string;
        isEnabled(): boolean;
        isShowText(): boolean;
        getText(): string;
        getTooltip(): string;
        getIcon(): IImage;
        run(e?: MouseEvent): void;
    }
}
declare namespace colibri.ui.controls {
    interface IBounds {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }
}
declare namespace colibri.ui.controls {
    abstract class CanvasControl extends Control {
        protected _canvas: HTMLCanvasElement;
        protected _context: CanvasRenderingContext2D;
        private _padding;
        constructor(padding?: number, ...classList: string[]);
        getCanvas(): HTMLCanvasElement;
        resizeTo(parent?: HTMLElement): void;
        getPadding(): number;
        protected ensureCanvasSize(): void;
        clear(): void;
        repaint(): void;
        private initContext;
        protected abstract paint(): void;
    }
}
declare namespace colibri.ui.controls {
    class DefaultImage implements IImage {
        private _ready;
        private _error;
        private _url;
        private _imageElement;
        private _requestPromise;
        constructor(img: HTMLImageElement, url: string);
        preloadSize(): Promise<PreloadResult>;
        getImageElement(): HTMLImageElement;
        getURL(): string;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        static paintImageElement(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, w: number, h: number, center: boolean): void;
        static paintEmpty(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
        static paintImageElementFrame(context: CanvasRenderingContext2D, image: HTMLImageElement, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
    }
}
declare namespace colibri.ui.controls {
    const EMPTY_PROGRESS_MONITOR: IProgressMonitor;
}
declare namespace colibri.ui.controls {
    class FillLayout implements ILayout {
        private _padding;
        constructor(padding?: number);
        getPadding(): number;
        setPadding(padding: number): void;
        layout(parent: Control): void;
    }
}
declare namespace colibri.ui.controls {
    class FrameData {
        index: number;
        src: controls.Rect;
        dst: controls.Rect;
        srcSize: controls.Point;
        constructor(index: number, src: controls.Rect, dst: controls.Rect, srcSize: controls.Point);
        static fromRect(index: number, rect: Rect): FrameData;
    }
}
declare namespace colibri.ui.controls {
    interface IImage {
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    interface ILayout {
        layout(parent: Control): any;
    }
}
declare namespace colibri.ui.controls {
    interface IProgressMonitor {
        addTotal(total: number): any;
        step(): any;
    }
}
declare namespace colibri.ui.controls {
    class ImageControl extends CanvasControl {
        private _image;
        constructor(padding?: number, ...classList: string[]);
        setImage(image: IImage): void;
        getImage(): IImage;
        protected paint(): Promise<void>;
        private paint2;
    }
}
declare namespace colibri.ui.controls {
    class ImageFrame implements IImage {
        private _name;
        private _image;
        private _frameData;
        constructor(name: string | number, image: controls.IImage, frameData: FrameData);
        preloadSize(): Promise<PreloadResult>;
        getName(): string | number;
        getImage(): IImage;
        getFrameData(): FrameData;
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
    }
}
declare namespace colibri.ui.controls {
    class ImageWrapper implements IImage {
        private _imageElement;
        constructor(imageElement: HTMLImageElement);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        preloadSize(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
    }
}
declare namespace colibri.ui.controls {
    class Menu {
        private _text;
        private _items;
        private _element;
        private _bgElement;
        private _menuCloseCallback;
        private static _activeMenu;
        private _subMenu;
        private _parentMenu;
        constructor(text?: string);
        setMenuClosedCallback(callback: () => void): void;
        add(action: Action): void;
        addMenu(subMenu: Menu): void;
        addCommand(commandId: string, config?: IActionConfig): void;
        addExtension(menuId: string): void;
        addSeparator(): void;
        isEmpty(): boolean;
        getElement(): HTMLDivElement;
        static getActiveMenu(): Menu;
        create(x: number, y: number, modal?: boolean): void;
        private closeSubMenu;
        createWithEvent(e: MouseEvent): void;
        getText(): string;
        close(): void;
        closeAll(): void;
    }
}
declare namespace colibri.ui.controls {
    interface IMenuExtensionConfig {
        command?: string;
        separator?: boolean;
    }
    class MenuExtension extends Extension {
        static POINT_ID: string;
        private _menuId;
        private _configList;
        constructor(menuId: string, ...configs: IMenuExtensionConfig[]);
        getMenuId(): string;
        fillMenu(menu: controls.Menu): void;
    }
}
declare namespace colibri.ui.controls {
    class MultiImage implements IImage {
        private _width;
        private _height;
        private _images;
        constructor(images: IImage[], width: number, height: number);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        resize(width: number, height: number): void;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    class MutableIcon {
        private _element;
        private _context;
        private _icon;
        constructor();
        getElement(): HTMLCanvasElement;
        setIcon(icon: IImage): void;
        getIcon(): IImage;
        repaint(): void;
    }
}
declare namespace colibri.ui.controls {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
declare namespace colibri.ui.controls {
    class Rect {
        x: number;
        y: number;
        w: number;
        h: number;
        constructor(x?: number, y?: number, w?: number, h?: number);
        set(x: number, y: number, w: number, h: number): void;
        contains(x: number, y: number): boolean;
        clone(): Rect;
    }
}
declare namespace colibri.ui.controls {
    class ScrollPane extends Control {
        private _clientControl;
        private _scrollBar;
        private _scrollHandler;
        private _clientContentHeight;
        constructor(clientControl: Control);
        getViewer(): Control;
        updateScroll(clientContentHeight: number): void;
        private onBarMouseDown;
        private onClientWheel;
        private setClientScrollY;
        private _startDragY;
        private _startScrollY;
        private onMouseDown;
        private onMouseMove;
        private onMouseUp;
        getBounds(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        layout(): void;
    }
}
declare namespace colibri.ui.controls {
    class SplitPanel extends Control {
        private _leftControl;
        private _rightControl;
        private _horizontal;
        private _splitPosition;
        private _splitFactor;
        private _splitWidth;
        private _startDrag;
        private _startPos;
        constructor(left?: Control, right?: Control, horizontal?: boolean);
        private onDragStart;
        private onMouseDown;
        private onMouseUp;
        private onMouseMove;
        private onMouseLeave;
        setHorizontal(horizontal?: boolean): void;
        setVertical(vertical?: boolean): void;
        getSplitFactor(): number;
        private getSize;
        setSplitFactor(factor: number): void;
        setLeftControl(control: Control): void;
        getLeftControl(): Control;
        setRightControl(control: Control): void;
        getRightControl(): Control;
        layout(): void;
    }
}
declare namespace colibri.ui.controls {
    const EVENT_TAB_CLOSED = "tabClosed";
    const EVENT_TAB_SELECTED = "tabSelected";
    const EVENT_TAB_LABEL_RESIZED = "tabResized";
    class TabPane extends Control {
        private _titleBarElement;
        private _contentAreaElement;
        private _iconSize;
        private static _selectedTimeCounter;
        constructor(...classList: string[]);
        addTab(label: string, icon: IImage, content: Control, closeable?: boolean, selectIt?: boolean): void;
        getTabIconSize(): number;
        setTabIconSize(size: number): void;
        incrementTabIconSize(amount: number): void;
        private makeLabel;
        private showTabLabelMenu;
        protected fillTabMenu(menu: Menu, labelElement: HTMLElement): void;
        setTabCloseIcons(labelElement: HTMLElement, icon: IImage, overIcon: IImage): void;
        closeTab(content: controls.Control): void;
        closeAll(): void;
        protected closeTabLabel(labelElement: HTMLElement): void;
        setTabTitle(content: Control, title: string, icon?: IImage): void;
        static isTabCloseIcon(element: HTMLElement): boolean;
        static isTabLabel(element: HTMLElement): boolean;
        getLabelFromContent(content: Control): HTMLElement;
        private static getContentAreaFromLabel;
        static getContentFromLabel(labelElement: HTMLElement): Control;
        selectTabWithContent(content: Control): void;
        protected selectTab(toSelectLabel: HTMLElement): void;
        getSelectedTabContent(): Control;
        isSelectedLabel(labelElement: HTMLElement): boolean;
        getContentList(): controls.Control[];
        private getSelectedLabelElement;
    }
}
declare namespace colibri.ui.controls {
    interface ITheme {
        id: string;
        classList: string[];
        displayName: string;
        viewerSelectionBackground: string;
        viewerSelectionForeground: string;
        viewerForeground: string;
        dark: boolean;
    }
}
declare namespace colibri.ui.controls {
    class ToolbarManager {
        private _toolbarElement;
        private _actionDataMap;
        constructor(toolbarElement: HTMLElement);
        addCommand(commandId: string, config?: IActionConfig): void;
        add(action: Action): void;
        dispose(): void;
        private updateButtonWithAction;
    }
}
declare namespace colibri.ui.controls {
    class Tooltip {
        static tooltip(element: HTMLElement, tooltip: string): void;
        static tooltipWithKey(element: HTMLElement, keyString: any, tooltip: string): void;
        private static renderTooltip;
    }
}
declare namespace colibri.ui.controls {
    const CONTROL_PADDING = 3;
    const ROW_HEIGHT = 20;
    const FONT_HEIGHT = 14;
    const FONT_OFFSET = 2;
    const FONT_FAMILY = "Arial, Helvetica, sans-serif";
    const ACTION_WIDTH = 20;
    const PANEL_BORDER_SIZE = 5;
    const PANEL_TITLE_HEIGHT = 22;
    const FILTERED_VIEWER_FILTER_HEIGHT = 30;
    const SPLIT_OVER_ZONE_WIDTH = 6;
    function setElementBounds(elem: HTMLElement, bounds: IBounds): void;
    function getElementBounds(elem: HTMLElement): IBounds;
}
declare namespace colibri.ui.controls.dialogs {
    class Dialog extends Control {
        private _containerElement;
        private _buttonPaneElement;
        private _titlePaneElement;
        private _width;
        private _height;
        private static _dialogs;
        private static _firstTime;
        private _parentDialog;
        private _closeWithEscapeKey;
        constructor(...classList: string[]);
        static closeAllDialogs(): void;
        static getActiveDialog(): Dialog;
        getDialogBackgroundElement(): HTMLElement;
        setCloseWithEscapeKey(closeWithEscapeKey: boolean): void;
        isCloseWithEscapeKey(): boolean;
        getParentDialog(): Dialog;
        create(): void;
        setTitle(title: string): void;
        addCancelButton(): void;
        addButton(text: string, callback: () => void): HTMLButtonElement;
        protected createDialogArea(): void;
        protected resize(): void;
        setSize(width: number, height: number): void;
        getSize(): {
            width: number;
            height: number;
        };
        close(): void;
        protected goFront(): void;
        closeAll(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class AlertDialog extends Dialog {
        private _messageElement;
        private static _currentDialog;
        constructor();
        createDialogArea(): void;
        create(): void;
        static replaceConsoleAlert(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ViewerDialog extends Dialog {
        private _viewer;
        private _filteredViewer;
        constructor(viewer: viewers.TreeViewer);
        createDialogArea(): void;
        getViewer(): viewers.TreeViewer;
        goFront(): void;
        enableButtonOnlyWhenOneElementIsSelected(btn: HTMLButtonElement): void;
        addOpenButton(text: string, callback: (selection: any[]) => void): HTMLButtonElement;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class CommandDialog extends controls.dialogs.ViewerDialog {
        constructor();
        create(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    type InputValidator = (input: string) => boolean;
    type ResultCallback = (value: string) => void;
    class InputDialog extends Dialog {
        private _textElement;
        private _messageElement;
        private _acceptButton;
        private _validator;
        private _resultCallback;
        constructor();
        setInputValidator(validator: InputValidator): void;
        setResultCallback(callback: ResultCallback): void;
        setMessage(message: string): void;
        setInitialValue(value: string): void;
        createDialogArea(): void;
        validate(): void;
        create(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ProgressDialog extends Dialog {
        private _progressElement;
        constructor();
        createDialogArea(): void;
        create(): void;
        setProgress(progress: number): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ProgressDialogMonitor implements IProgressMonitor {
        private _dialog;
        private _total;
        private _step;
        constructor(dialog: ProgressDialog);
        private updateDialog;
        addTotal(total: number): void;
        step(): void;
    }
}
declare namespace colibri.ui.controls.properties {
    class PropertyPage extends Control {
        private _sectionProvider;
        private _sectionPanes;
        private _sectionPaneMap;
        private _selection;
        constructor();
        private build;
        private updateWithSelection;
        updateExpandStatus(): void;
        getSelection(): any[];
        setSelection(sel: any[]): any;
        setSectionProvider(provider: PropertySectionProvider): void;
        getSectionProvider(): PropertySectionProvider;
    }
}
declare namespace colibri.ui.controls.properties {
    type Updater = () => void;
    abstract class PropertySection<T> {
        private _id;
        private _title;
        private _page;
        private _updaters;
        private _fillSpace;
        private _collapsedByDefault;
        constructor(page: PropertyPage, id: string, title: string, fillSpace?: boolean, collapsedByDefault?: boolean);
        protected abstract createForm(parent: HTMLDivElement): any;
        abstract canEdit(obj: any, n: number): boolean;
        abstract canEditNumber(n: number): boolean;
        updateWithSelection(): void;
        addUpdater(updater: Updater): void;
        isFillSpace(): boolean;
        isCollapsedByDefault(): boolean;
        getPage(): PropertyPage;
        getSelection(): T[];
        getSelectionFirstElement(): T;
        getId(): string;
        getTitle(): string;
        create(parent: HTMLDivElement): void;
        flatValues_Number(values: number[]): string;
        flatValues_StringJoin(values: string[]): string;
        flatValues_StringJoinDifferent(values: string[]): string;
        flatValues_StringOneOrNothing(values: string[]): string;
        protected createGridElement(parent: HTMLElement, cols?: number, simpleProps?: boolean): HTMLDivElement;
        protected createLabel(parent: HTMLElement, text?: string, tooltip?: string): HTMLLabelElement;
        protected createButton(parent: HTMLElement, text: string, callback: (e?: MouseEvent) => void): HTMLButtonElement;
        protected createMenuButton(parent: HTMLElement, text: string, items: Array<{
            name: string;
            value: any;
        }>, callback: (value: any) => void): HTMLButtonElement;
        protected createText(parent: HTMLElement, readOnly?: boolean): HTMLInputElement;
        protected createTextArea(parent: HTMLElement, readOnly?: boolean): HTMLTextAreaElement;
        private static NEXT_ID;
        protected createCheckbox(parent: HTMLElement, label?: HTMLLabelElement): HTMLInputElement;
    }
}
declare namespace colibri.ui.controls.properties {
    abstract class PropertySectionProvider {
        abstract addSections(page: PropertyPage, sections: Array<PropertySection<any>>): void;
        getEmptySelectionObject(): any;
    }
}
declare namespace colibri.ui.controls.viewers {
    const EMPTY_ARRAY: any[];
    class ArrayTreeContentProvider implements ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    class EmptyCellRenderer implements ICellRenderer {
        private _variableSize;
        constructor(variableSize?: boolean);
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class EmptyCellRendererProvider implements ICellRendererProvider {
        private _getRenderer;
        constructor(getRenderer?: (element: any) => ICellRenderer);
        getCellRenderer(element: any): ICellRenderer;
        preload(obj: any): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class EmptyTreeContentProvider implements ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    class FilterControl extends Control {
        private _filterElement;
        constructor();
        getFilterElement(): HTMLInputElement;
    }
    export class ViewerContainer extends controls.Control {
        private _viewer;
        constructor(viewer: Viewer);
        getViewer(): Viewer;
        layout(): void;
    }
    export class FilteredViewer<T extends Viewer> extends Control {
        private _viewer;
        private _viewerContainer;
        private _filterControl;
        private _scrollPane;
        constructor(viewer: T, ...classList: string[]);
        private onFilterInput;
        filterText(value: string): void;
        getViewer(): T;
        layout(): void;
        getFilterControl(): FilterControl;
    }
    export {};
}
declare namespace colibri.ui.controls.viewers {
    class FilteredViewerInElement<T extends Viewer> extends FilteredViewer<T> {
        constructor(viewer: T, ...classList: string[]);
        resizeTo(): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    class FolderCellRenderer implements ICellRenderer {
        private _maxCount;
        constructor(maxCount?: number);
        renderCell(args: RenderCellArgs): void;
        private renderFolder;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
        protected renderGrid(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
    }
}
declare namespace colibri.ui.controls.viewers {
    class TreeViewerRenderer {
        private _viewer;
        constructor(viewer: TreeViewer, cellSize?: number);
        getViewer(): TreeViewer;
        paint(): {
            contentHeight: number;
            paintItems: PaintItem[];
            treeIconList: TreeIconInfo[];
        };
        protected paintItems(objects: any[], treeIconList: TreeIconInfo[], paintItems: PaintItem[], parentPaintItem: PaintItem, x: number, y: number): {
            x: number;
            y: number;
        };
        private renderTreeCell;
        protected prepareContextForText(args: RenderCellArgs): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    const TREE_RENDERER_GRID_PADDING = 5;
    class GridTreeViewerRenderer extends TreeViewerRenderer {
        private _center;
        private _flat;
        private _sections;
        constructor(viewer: TreeViewer, flat?: boolean, center?: boolean);
        isFlat(): boolean;
        setSections(sections: any[]): void;
        getSections(): any[];
        paint(): {
            contentHeight: number;
            paintItems: PaintItem[];
            treeIconList: TreeIconInfo[];
        };
        protected paintItems(objects: any[], treeIconList: TreeIconInfo[], paintItems: PaintItem[], parentPaintItem: PaintItem, x: number, y: number): {
            x: number;
            y: number;
        };
        private paintItems2;
        private renderGridCell;
        protected renderCellBack(args: RenderCellArgs, selected: boolean, isLastChild: boolean): void;
        protected renderCellFront(args: RenderCellArgs, selected: boolean, isLastChild: boolean): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ICellRenderer {
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ICellRendererProvider {
        getCellRenderer(element: any): ICellRenderer;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface IContentProvider {
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ILabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace colibri.ui.controls.viewers {
    abstract class LabelCellRenderer implements ICellRenderer {
        renderCell(args: RenderCellArgs): void;
        abstract getImage(obj: any): controls.IImage;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class ImageCellRenderer implements ICellRenderer {
        private _singleImage;
        constructor(singleImage?: IImage);
        getImage(obj: any): IImage;
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    const EVENT_OPEN_ITEM = "itemOpened";
    abstract class Viewer extends Control {
        private _contentProvider;
        private _cellRendererProvider;
        private _labelProvider;
        private _input;
        private _cellSize;
        protected _expandedObjects: Set<any>;
        private _selectedObjects;
        protected _context: CanvasRenderingContext2D;
        protected _paintItems: PaintItem[];
        private _lastSelectedItemIndex;
        protected _contentHeight: number;
        private _filterText;
        protected _filterIncludeSet: Set<any>;
        private _menu;
        constructor(...classList: string[]);
        private initListeners;
        private onKeyDown;
        private moveCursor;
        private onDragStart;
        getLabelProvider(): ILabelProvider;
        setLabelProvider(labelProvider: ILabelProvider): void;
        setFilterText(filterText: string): void;
        getFilterText(): string;
        private prepareFiltering;
        isFilterIncluded(obj: any): boolean;
        protected abstract buildFilterIncludeMap(): any;
        protected matches(obj: any): boolean;
        protected getPaintItemAt(e: MouseEvent): PaintItem;
        getSelection(): any[];
        getSelectionFirstElement(): any;
        setSelection(selection: any[], notify?: boolean): void;
        abstract reveal(...objects: any[]): void;
        private fireSelectionChanged;
        escape(): void;
        private onWheel;
        private onDoubleClick;
        protected abstract canSelectAtPoint(e: MouseEvent): boolean;
        onMouseUp(e: MouseEvent): void;
        private initContext;
        setExpanded(obj: any, expanded: boolean): void;
        isExpanded(obj: any): boolean;
        getExpandedObjects(): Set<any>;
        isCollapsed(obj: any): boolean;
        collapseAll(): void;
        expandCollapseBranch(obj: any): any[];
        isSelected(obj: any): boolean;
        protected paintTreeHandler(x: number, y: number, collapsed: boolean): void;
        repaint(): Promise<void>;
        updateScrollPane(): void;
        private repaint2;
        protected abstract preload(): Promise<PreloadResult>;
        paintItemBackground(obj: any, x: number, y: number, w: number, h: number, radius?: number): void;
        setScrollY(scrollY: number): void;
        layout(): void;
        protected abstract paint(): void;
        getCanvas(): HTMLCanvasElement;
        getContext(): CanvasRenderingContext2D;
        getCellSize(): number;
        setCellSize(cellSize: number): void;
        getContentProvider(): IContentProvider;
        setContentProvider(contentProvider: IContentProvider): void;
        getCellRendererProvider(): ICellRendererProvider;
        setCellRendererProvider(cellRendererProvider: ICellRendererProvider): void;
        getInput(): any;
        setInput(input: any): void;
        selectFirst(): void;
        getState(): ViewerState;
        setState(state: ViewerState): void;
        selectAll(): void;
    }
    type ViewerState = {
        expandedObjects: Set<any>;
        selectedObjects: Set<any>;
        filterText: string;
        cellSize: number;
    };
}
declare namespace colibri.ui.controls.viewers {
    interface ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    class IconImageCellRenderer implements ICellRenderer {
        private _icon;
        constructor(icon: IImage);
        getIcon(obj: any): IImage;
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class IconGridCellRenderer implements ICellRenderer {
        private _icon;
        constructor(icon: IImage);
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<any>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class LabelProvider implements ILabelProvider {
        private _getLabel;
        constructor(getLabel?: (obj: any) => string);
        getLabel(obj: any): string;
    }
}
declare namespace colibri.ui.controls.viewers {
    class PaintItem extends controls.Rect {
        index: number;
        data: any;
        parent: PaintItem;
        constructor(index: number, data: any, parent?: PaintItem);
    }
}
declare namespace colibri.ui.controls.viewers {
    class PreloadCellArgs {
        obj: any;
        viewer: Viewer;
        constructor(obj: any, viewer: Viewer);
        clone(): PreloadCellArgs;
    }
}
declare namespace colibri.ui.controls.viewers {
    class RenderCellArgs {
        canvasContext: CanvasRenderingContext2D;
        x: number;
        y: number;
        w: number;
        h: number;
        obj: any;
        viewer: Viewer;
        center: boolean;
        constructor(canvasContext: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, obj: any, viewer: Viewer, center?: boolean);
        clone(): RenderCellArgs;
    }
}
declare namespace colibri.ui.controls.viewers {
    import controls = colibri.ui.controls;
    class ShadowGridTreeViewerRenderer extends controls.viewers.GridTreeViewerRenderer {
        constructor(viewer: controls.viewers.TreeViewer, flat?: boolean, center?: boolean);
        renderCellBack(args: controls.viewers.RenderCellArgs, selected: boolean, isLastChild: boolean): void;
        protected isShadowAsChild(obj: any): boolean;
    }
}
declare namespace colibri.ui.controls.viewers {
    const TREE_ICON_SIZE = 16;
    const LABEL_MARGIN: number;
    type TreeIconInfo = {
        rect: Rect;
        obj: any;
    };
    class TreeViewer extends Viewer {
        private _treeRenderer;
        private _treeIconList;
        constructor(...classList: string[]);
        getTreeRenderer(): TreeViewerRenderer;
        setTreeRenderer(treeRenderer: TreeViewerRenderer): void;
        canSelectAtPoint(e: MouseEvent): boolean;
        reveal(...objects: any[]): void;
        private revealPath;
        getObjectPath(obj: any): any[];
        private getObjectPath2;
        private getTreeIconAtPoint;
        private onClick;
        visitObjects(visitor: (obj: any) => void): void;
        private visitObjects2;
        preload(): Promise<PreloadResult>;
        protected paint(): void;
        setFilterText(filter: string): void;
        private expandFilteredParents;
        buildFilterIncludeMap(): void;
        private buildFilterIncludeMap2;
        getContentProvider(): ITreeContentProvider;
        expandCollapseBranch(obj: any): any[];
    }
}
declare namespace colibri.ui.ide {
    type ContentTypeIconExtensionConfig = Array<{
        icon: controls.IImage;
        contentType: string;
    }>;
    class ContentTypeIconExtension extends Extension {
        static POINT_ID: string;
        private _config;
        static withPluginIcons(plugin: colibri.Plugin, config: Array<{
            iconName: string;
            contentType: string;
            plugin?: colibri.Plugin;
        }>): ContentTypeIconExtension;
        constructor(config: ContentTypeIconExtensionConfig);
        getConfig(): ContentTypeIconExtensionConfig;
    }
}
declare namespace colibri.ui.ide {
    const EVENT_PART_TITLE_UPDATED = "partTitledUpdated";
    abstract class Part extends controls.Control {
        private _id;
        private _title;
        private _selection;
        private _partCreated;
        private _icon;
        private _folder;
        private _undoManager;
        private _restoreState;
        constructor(id: string);
        setRestoreState(state: any): void;
        getUndoManager(): undo.UndoManager;
        getPartFolder(): PartFolder;
        setPartFolder(folder: PartFolder): void;
        getTitle(): string;
        setTitle(title: string): void;
        setIcon(icon: controls.IImage): void;
        dispatchTitleUpdatedEvent(): void;
        getIcon(): controls.IImage;
        getId(): string;
        setSelection(selection: any[], notify?: boolean): void;
        getSelection(): any[];
        dispatchSelectionChanged(): void;
        getPropertyProvider(): controls.properties.PropertySectionProvider;
        layout(): void;
        onPartAdded(): void;
        onPartClosed(): boolean;
        onPartShown(): void;
        protected doCreatePart(): void;
        onPartActivated(): void;
        saveState(state: any): void;
        protected restoreState(state: any): void;
        protected abstract createPart(): void;
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorPart extends Part {
        private _input;
        private _dirty;
        constructor(id: string);
        setDirty(dirty: boolean): void;
        isDirty(): boolean;
        save(): Promise<void>;
        protected doSave(): Promise<void>;
        onPartClosed(): boolean;
        onPartAdded(): void;
        getInput(): IEditorInput;
        setInput(input: IEditorInput): void;
        getEditorViewerProvider(key: string): EditorViewerProvider;
        createEditorToolbar(parent: HTMLElement): controls.ToolbarManager;
    }
}
declare namespace colibri.ui.ide {
    class PartFolder extends controls.TabPane {
        constructor(...classList: string[]);
        addPart(part: Part, closeable?: boolean, selectIt?: boolean): void;
        getParts(): Part[];
    }
}
declare namespace colibri.ui.ide {
    class EditorArea extends PartFolder {
        private _tabsToBeClosed;
        constructor();
        activateEditor(editor: EditorPart): void;
        getEditors(): EditorPart[];
        getSelectedEditor(): EditorPart;
        fillTabMenu(menu: controls.Menu, labelElement: HTMLElement): void;
        closeAllEditors(): void;
        closeEditors(editors: EditorPart[]): void;
        selectTab(label: HTMLElement): void;
    }
}
declare namespace colibri.ui.ide {
    class EditorExtension extends Extension {
        static POINT_ID: string;
        private _factories;
        constructor(factories: EditorFactory[]);
        getFactories(): EditorFactory[];
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorFactory {
        private _id;
        constructor(id: string);
        getId(): string;
        abstract acceptInput(input: any): boolean;
        abstract createEditor(): EditorPart;
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorInputExtension extends Extension {
        static POINT_ID: string;
        private _id;
        constructor(id: string);
        getId(): string;
        abstract createEditorInput(state: any): IEditorInput;
        abstract getEditorInputState(input: IEditorInput): any;
        abstract getEditorInputId(input: IEditorInput): string;
    }
}
declare namespace colibri.ui.ide {
    class EditorRegistry {
        private _map;
        constructor();
        registerFactory(factory: EditorFactory): void;
        getFactoryForInput(input: any): EditorFactory;
    }
}
declare namespace colibri.ui.ide {
    import viewers = controls.viewers;
    abstract class EditorViewerProvider {
        private _viewer;
        private _initialSelection;
        constructor();
        setViewer(viewer: controls.viewers.TreeViewer): void;
        setSelection(selection: any[], reveal: boolean, notify: boolean): void;
        getSelection(): any[];
        onViewerSelectionChanged(selection: any[]): void;
        repaint(): void;
        prepareViewerState(state: viewers.ViewerState): void;
        abstract getContentProvider(): viewers.ITreeContentProvider;
        abstract getLabelProvider(): viewers.ILabelProvider;
        abstract getCellRendererProvider(): viewers.ICellRendererProvider;
        abstract getTreeViewerRenderer(viewer: controls.viewers.TreeViewer): viewers.TreeViewerRenderer;
        abstract getPropertySectionProvider(): controls.properties.PropertySectionProvider;
        abstract getInput(): any;
        abstract preload(): Promise<void>;
        abstract getUndoManager(): any;
        fillContextMenu(menu: controls.Menu): void;
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewPart extends Part {
        constructor(id: string);
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewerView extends ViewPart {
        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        constructor(id: string);
        protected abstract createViewer(): controls.viewers.TreeViewer;
        protected createPart(): void;
        protected fillContextMenu(menu: controls.Menu): void;
        private onMenu;
        getViewer(): controls.viewers.TreeViewer;
        layout(): void;
    }
}
declare namespace colibri.ui.ide {
    import viewers = controls.viewers;
    abstract class EditorViewerView extends ide.ViewerView {
        private _currentEditor;
        private _currentViewerProvider;
        private _viewerStateMap;
        constructor(id: string);
        protected createViewer(): viewers.TreeViewer;
        protected createPart(): void;
        fillContextMenu(menu: controls.Menu): void;
        abstract getViewerProvider(editor: EditorPart): EditorViewerProvider;
        private onWorkbenchEditorActivated;
        getPropertyProvider(): controls.properties.PropertySectionProvider;
        getUndoManager(): any;
    }
}
declare namespace colibri.ui.ide {
    import io = core.io;
    abstract class FileEditor extends EditorPart {
        private _onFileStorageListener;
        private _isSaving;
        constructor(id: string);
        save(): Promise<void>;
        protected isSaving(): boolean;
        protected onFileStorageChanged(change: io.FileStorageChange): void;
        protected abstract onEditorInputContentChanged(): any;
        onPartClosed(): boolean;
        setInput(file: io.FilePath): void;
        getInput(): core.io.FilePath;
        getIcon(): any;
    }
}
declare namespace colibri.core.io {
    interface FilePath extends colibri.ui.ide.IEditorInput {
    }
}
declare namespace colibri.ui.ide {
    class FileEditorInputExtension extends EditorInputExtension {
        static ID: string;
        constructor();
        getEditorInputState(input: core.io.FilePath): {
            filePath: string;
        };
        createEditorInput(state: any): IEditorInput;
        getEditorInputId(input: core.io.FilePath): string;
    }
}
declare namespace colibri.ui.ide {
    class FileImage extends controls.DefaultImage {
        private _file;
        constructor(file: core.io.FilePath);
        getFile(): core.io.FilePath;
        preload(): Promise<controls.PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<controls.PreloadResult>;
    }
}
declare namespace colibri.ui.ide {
    import io = core.io;
    class FileUtils {
        static preloadImageSize(file: io.FilePath): Promise<controls.PreloadResult>;
        static getImageSize(file: io.FilePath): core.io.ImageSize;
        static getImage(file: io.FilePath): FileImage;
        static preloadAndGetFileString(file: io.FilePath): Promise<string>;
        static getFileString(file: io.FilePath): string;
        static setFileString_async(file: io.FilePath, content: string): Promise<void>;
        static getFileStringCache(): io.FileStringCache;
        static getFileStorage(): io.IFileStorage;
        static createFile_async(folder: io.FilePath, fileName: string, content: string): Promise<io.FilePath>;
        static createFolder_async(container: io.FilePath, folderName: string): Promise<io.FilePath>;
        static deleteFiles_async(files: io.FilePath[]): Promise<void>;
        static renameFile_async(file: io.FilePath, newName: string): Promise<void>;
        static moveFiles_async(movingFiles: io.FilePath[], moveTo: io.FilePath): Promise<void>;
        static copyFile_async(fromFile: io.FilePath, toFile: io.FilePath): Promise<io.FilePath>;
        static getProjects_async(): Promise<string[]>;
        static getProjectTemplates_async(): Promise<io.ProjectTemplatesData>;
        static createProject_async(templatePath: string, projectName: string): Promise<boolean>;
        static preloadFileString(file: io.FilePath): Promise<ui.controls.PreloadResult>;
        static getFileFromPath(path: string): io.FilePath;
        static uploadFile_async(uploadFolder: io.FilePath, file: File): Promise<io.FilePath>;
        static getFilesWithContentType(contentType: string): Promise<io.FilePath[]>;
        static getAllFiles(): io.FilePath[];
        static getRoot(): io.FilePath;
    }
}
declare namespace colibri.ui.ide {
    interface IEditorInput {
        getEditorInputExtension(): string;
    }
}
declare namespace colibri.ui.ide {
    class IconLoaderExtension extends Extension {
        static POINT_ID: string;
        static withPluginFiles(plugin: colibri.Plugin, iconNames: string[]): IconLoaderExtension;
        private _icons;
        constructor(icons: controls.IImage[]);
        getIcons(): controls.IImage[];
    }
}
declare namespace colibri.ui.ide {
    class ImageFileCache extends core.io.SyncFileContentCache<FileImage> {
        constructor();
    }
}
declare namespace colibri.ui.ide {
    class ImageSizeFileCache extends core.io.FileContentCache<core.io.ImageSize> {
        constructor();
    }
}
declare namespace colibri.ui.ide {
    class MainToolbar extends controls.Control {
        private _leftArea;
        private _centerArea;
        private _rightArea;
        private _currentManager;
        constructor();
        getLeftArea(): HTMLElement;
        getCenterArea(): HTMLElement;
        getRightArea(): HTMLElement;
        private onEditorActivated;
    }
}
declare namespace colibri.ui.ide {
    abstract class OutlineProvider extends EventTarget {
        private _editor;
        constructor(editor: EditorPart);
        abstract getContentProvider(): controls.viewers.ITreeContentProvider;
        abstract getLabelProvider(): controls.viewers.ILabelProvider;
        abstract getCellRendererProvider(): controls.viewers.ICellRendererProvider;
        abstract getTreeViewerRenderer(viewer: controls.viewers.TreeViewer): controls.viewers.TreeViewerRenderer;
    }
}
declare namespace colibri.ui.ide {
    abstract class PreloadProjectResourcesExtension extends Extension {
        static POINT_ID: string;
        constructor();
        abstract computeTotal(): Promise<number>;
        abstract preload(monitor: controls.IProgressMonitor): any;
    }
}
declare namespace colibri.ui.ide {
    class ViewFolder extends PartFolder {
        constructor(...classList: string[]);
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewerFileEditor extends FileEditor {
        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        constructor(id: string);
        protected abstract createViewer(): controls.viewers.TreeViewer;
        protected createPart(): void;
        getViewer(): controls.viewers.TreeViewer;
        layout(): void;
    }
}
declare namespace colibri.ui.ide {
    type CreateWindowFunc = () => WorkbenchWindow;
    class WindowExtension extends Extension {
        static POINT_ID: string;
        private _createWindowFunc;
        constructor(createWindowFunc: CreateWindowFunc);
        createWindow(): WorkbenchWindow;
    }
}
declare namespace colibri.ui.ide {
    abstract class WorkbenchWindow extends controls.Control {
        private _toolbar;
        private _clientArea;
        private _id;
        private _created;
        constructor(id: string);
        saveState(prefs: colibri.core.preferences.Preferences): void;
        restoreState(prefs: colibri.core.preferences.Preferences): void;
        protected saveEditorsState(prefs: colibri.core.preferences.Preferences): void;
        protected restoreEditors(prefs: colibri.core.preferences.Preferences): void;
        private onStorageChanged;
        create(): void;
        protected abstract createParts(): any;
        getId(): string;
        getToolbar(): MainToolbar;
        getClientArea(): controls.Control;
        getViews(): ViewPart[];
        getView(viewId: string): ViewPart;
        private findViews;
        protected createViewFolder(...parts: Part[]): ViewFolder;
        abstract getEditorArea(): EditorArea;
    }
}
declare namespace colibri.ui.ide {
    class WorkbenchWindowLayout implements controls.ILayout {
        layout(parent: controls.Control): void;
    }
}
declare namespace colibri.ui.ide {
    const IMG_SECTION_PADDING = 10;
}
declare namespace colibri.ui.ide.commands {
    interface IKeyMatcherConfig {
        control?: boolean;
        shift?: boolean;
        alt?: boolean;
        meta?: boolean;
        key?: string;
        filterInputElements?: boolean;
    }
    class KeyMatcher {
        private _control;
        private _shift;
        private _alt;
        private _meta;
        private _key;
        private _filterInputElements;
        constructor(config: IKeyMatcherConfig);
        getKeyString(): string;
        matchesKeys(event: KeyboardEvent): boolean;
        matchesTarget(element: EventTarget): boolean;
    }
}
declare namespace colibri.ui.ide.actions {
    const CAT_GENERAL = "colibri.ui.ide.actions.GeneralCategory";
    const CAT_EDIT = "colibri.ui.ide.actions.EditCategory";
    const CMD_SAVE = "colibri.ui.ide.actions.Save";
    const CMD_EDITOR_TABS_SIZE_UP = "colibri.ui.ide.actions.EditorTabsSizeUp";
    const CMD_EDITOR_TABS_SIZE_DOWN = "colibri.ui.ide.actions.EditorTabsSizeDown";
    const CMD_EDITOR_CLOSE = "colibri.ui.ide.actions.EditorClose";
    const CMD_EDITOR_CLOSE_ALL = "colibri.ui.ide.actions.EditorCloseAll";
    const CMD_DELETE = "colibri.ui.ide.actions.Delete";
    const CMD_RENAME = "colibri.ui.ide.actions.Rename";
    const CMD_UNDO = "colibri.ui.ide.actions.Undo";
    const CMD_REDO = "colibri.ui.ide.actions.Redo";
    const CMD_COLLAPSE_ALL = "colibri.ui.ide.actions.CollapseAll";
    const CMD_EXPAND_COLLAPSE_BRANCH = "colibri.ui.ide.actions.ExpandCollapseBranch";
    const CMD_SELECT_ALL = "colibri.ui.ide.actions.SelectAll";
    const CMD_ESCAPE = "colibri.ui.ide.actions.Escape";
    const CMD_UPDATE_CURRENT_EDITOR = "colibri.ui.ide.actions.UpdateCurrentEditor";
    const CMD_SHOW_COMMAND_PALETTE = "colibri.ui.ide.actions.ShowCommandPalette";
    const CMD_COPY = "colibri.ui.ide.actions.Copy";
    const CMD_CUT = "colibri.ui.ide.actions.Cut";
    const CMD_PASTE = "colibri.ui.ide.actions.Paste";
    class ColibriCommands {
        static registerCommands(manager: commands.CommandManager): void;
        private static initPalette;
        private static initEditors;
        private static initViewer;
        private static initUndo;
        private static initEdit;
    }
}
declare namespace colibri.ui.ide.actions {
    abstract class PartAction<T extends ide.Part> extends controls.Action {
        private _part;
        constructor(part: T, config: controls.IActionConfig);
        getPart(): T;
    }
}
declare namespace colibri.ui.ide.actions {
    abstract class ViewerViewAction<T extends ide.ViewerView> extends PartAction<T> {
        constructor(view: T, config: controls.IActionConfig);
        getViewViewer(): controls.viewers.TreeViewer;
        getViewViewerSelection(): any[];
    }
}
declare namespace colibri.ui.ide.commands {
    interface ICommandConfig {
        id: string;
        name: string;
        tooltip: string;
        icon?: controls.IImage;
        category: string;
    }
    class Command {
        private _id;
        private _name;
        private _tooltip;
        private _icon;
        private _categoryId;
        constructor(config: ICommandConfig);
        getCategoryId(): string;
        getId(): string;
        getName(): string;
        getTooltip(): string;
        getIcon(): controls.IImage;
    }
}
declare namespace colibri.ui.ide.commands {
    class HandlerArgs {
        readonly activePart: Part;
        readonly activeEditor: EditorPart;
        readonly activeElement: HTMLElement;
        readonly activeMenu: controls.Menu;
        readonly activeWindow: ide.WorkbenchWindow;
        readonly activeDialog: controls.dialogs.Dialog;
        constructor(activePart: Part, activeEditor: EditorPart, activeElement: HTMLElement, activeMenu: controls.Menu, activeWindow: ide.WorkbenchWindow, activeDialog: controls.dialogs.Dialog);
    }
}
declare namespace colibri.ui.ide.commands {
    class CommandExtension extends Extension {
        static POINT_ID: string;
        private _configurer;
        constructor(configurer: (manager: CommandManager) => void);
        getConfigurer(): (manager: CommandManager) => void;
    }
}
declare namespace colibri.ui.ide.commands {
    interface IHandlerConfig {
        testFunc?: (args: HandlerArgs) => boolean;
        executeFunc?: (args: HandlerArgs) => void;
    }
    class CommandHandler {
        private _testFunc;
        private _executeFunc;
        constructor(config: IHandlerConfig);
        test(args: HandlerArgs): boolean;
        execute(args: HandlerArgs): void;
    }
}
declare namespace colibri.ui.ide.commands {
    class CommandManager {
        private _commandIdMap;
        private _commands;
        private _commandMatcherMap;
        private _commandHandlerMap;
        private _categoryMap;
        private _categories;
        constructor();
        private onKeyDown;
        canRunCommand(commandId: string): boolean;
        private executeHandler;
        addCategory(category: ICommandCategory): void;
        getCategories(): ICommandCategory[];
        getCategory(id: string): ICommandCategory;
        addCommand(cmd: Command): void;
        addCommandHelper(config: {
            id: string;
            name: string;
            tooltip: string;
            category: string;
            icon?: controls.IImage;
        }): void;
        private makeArgs;
        getCommands(): Command[];
        getActiveCommands(): Command[];
        getCommand(id: string): Command;
        getCommandKeyString(commandId: string): string;
        executeCommand(commandId: string, checkContext?: boolean): void;
        addKeyBinding(commandId: string, matcher: KeyMatcher): void;
        addKeyBindingHelper(commandId: string, config: IKeyMatcherConfig): void;
        addHandler(commandId: string, handler: CommandHandler): void;
        addHandlerHelper(commandId: string, testFunc: (args: HandlerArgs) => boolean, executeFunc: (args: HandlerArgs) => void): void;
        add(args: {
            command?: ICommandConfig;
            handler?: IHandlerConfig;
            keys?: IKeyMatcherConfig;
        }, commandId?: string): void;
    }
}
declare namespace colibri.ui.ide.commands {
    interface ICommandCategory {
        id: string;
        name: string;
    }
}
declare namespace colibri.ui.ide.properties {
    abstract class BaseImagePreviewSection<T> extends controls.properties.PropertySection<T> {
        protected createForm(parent: HTMLDivElement): void;
        protected abstract getSelectedImage(): controls.IImage;
        canEditNumber(n: number): boolean;
    }
}
declare namespace colibri.ui.ide.properties {
    import controls = colibri.ui.controls;
    abstract class BaseManyImagePreviewSection<T> extends controls.properties.PropertySection<T> {
        protected createForm(parent: HTMLDivElement): void;
        protected abstract getViewerInput(): Promise<unknown>;
        protected abstract prepareViewer(viewer: controls.viewers.TreeViewer): any;
        canEditNumber(n: number): boolean;
    }
}
declare namespace colibri.ui.ide.properties {
    class FilteredViewerInPropertySection<T extends controls.viewers.Viewer> extends controls.viewers.FilteredViewer<T> {
        constructor(page: controls.properties.PropertyPage, viewer: T, ...classList: string[]);
        resizeTo(): void;
    }
}
declare namespace colibri.ui.ide.themes {
    class ThemeExtension extends Extension {
        static POINT_ID: string;
        private _theme;
        constructor(theme: controls.ITheme);
        getTheme(): controls.ITheme;
    }
}
declare namespace colibri.ui.ide.undo {
    abstract class Operation {
        abstract undo(): void;
        abstract redo(): void;
        execute(): Promise<any>;
    }
}
declare namespace colibri.ui.ide.undo {
    class UndoManager {
        private _undoList;
        private _redoList;
        constructor();
        add(op: Operation): Promise<void>;
        undo(): void;
        redo(): void;
    }
}
declare namespace colibri.ui.ide.utils {
    type GetName = (obj: any) => string;
    export class NameMaker {
        private _getName;
        private _nameSet;
        constructor(getName: GetName);
        update(objects: any[]): void;
        makeName(baseName: string): string;
    }
    export {};
}
//# sourceMappingURL=colibri.d.ts.map